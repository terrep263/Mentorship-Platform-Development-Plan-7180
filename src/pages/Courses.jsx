import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourses } from '../contexts/CourseContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiClock, FiBarChart, FiFilter } = FiIcons;

const Courses = () => {
  const { courses, progress } = useCourses();
  const [filter, setFilter] = useState('all');

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'in-progress') {
      const courseProgress = progress[course.id];
      return courseProgress && courseProgress.percentage > 0 && courseProgress.percentage < 100;
    }
    if (filter === 'completed') {
      const courseProgress = progress[course.id];
      return courseProgress && courseProgress.percentage === 100;
    }
    if (filter === 'not-started') {
      const courseProgress = progress[course.id];
      return !courseProgress || courseProgress.percentage === 0;
    }
    return true;
  });

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Courses</h1>
        <p className="text-gray-600">Continue your learning journey with our expert-curated content</p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Courses' },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
            { key: 'not-started', label: 'Not Started' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterOption.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Courses Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {filteredCourses.map((course, index) => {
          const courseProgress = progress[course.id] || { percentage: 0, completed: [], total: course.lessons?.length || 0 };
          
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {course.level}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${courseProgress.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-700">{courseProgress.percentage}% complete</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SafeIcon icon={FiBarChart} className="w-4 h-4" />
                    <span>{course.lessons?.length || 0} lessons</span>
                  </div>
                </div>
                
                <Link
                  to={`/courses/${course.id}`}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <SafeIcon icon={FiPlay} className="w-5 h-5" />
                  {courseProgress.percentage === 0 ? 'Start Course' : 'Continue Learning'}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredCourses.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiPlay} className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your filter to see more courses</p>
        </motion.div>
      )}
    </div>
  );
};

export default Courses;