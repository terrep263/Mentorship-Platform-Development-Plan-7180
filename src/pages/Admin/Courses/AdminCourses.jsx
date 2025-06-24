import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiBook, FiUsers, FiClock } = FiIcons;

const AdminCourses = () => {
  const [courses] = useState([
    {
      id: 1,
      title: 'Business Fundamentals',
      description: 'Learn the core principles of building a successful business',
      thumbnail: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400',
      duration: '4 weeks',
      level: 'Beginner',
      lessons: 12,
      enrollments: 145,
      is_published: true,
      created_at: '2024-01-15'
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      description: 'Master digital marketing strategies and tools',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      duration: '6 weeks',
      level: 'Intermediate',
      lessons: 18,
      enrollments: 89,
      is_published: true,
      created_at: '2024-01-10'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>
          <p className="text-gray-600 mt-1">Manage your course content and structure</p>
        </div>
        <Link
          to="/admin/courses/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          Add New Course
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.is_published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiBook} className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiUsers} className="w-4 h-4" />
                  <span>{course.enrollments}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link
                  to={`/courses/${course.id}`}
                  target="_blank"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Course"
                >
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                </Link>
                <Link
                  to={`/admin/courses/edit/${course.id}`}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  title="Edit Course"
                >
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                </Link>
                <button
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Course"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiBook} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first course</p>
          <Link
            to="/admin/courses/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            Create Your First Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;