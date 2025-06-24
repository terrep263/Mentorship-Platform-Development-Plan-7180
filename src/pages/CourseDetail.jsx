import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourses } from '../contexts/CourseContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiClock, FiFileText, FiHeadphones, FiCheck, FiArrowLeft } = FiIcons;

const CourseDetail = () => {
  const { courseId } = useParams();
  const { courses, progress } = useCourses();
  
  const course = courses.find(c => c.id === courseId);
  const courseProgress = progress[courseId] || { completed: [], total: 0, percentage: 0 };

  if (!course) {
    return (
      <div className="px-4 py-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h1>
        <Link to="/courses" className="text-primary-600 hover:text-primary-700">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const getIconForLessonType = (type) => {
    switch (type) {
      case 'video': return FiPlay;
      case 'audio': return FiHeadphones;
      case 'text': return FiFileText;
      default: return FiFileText;
    }
  };

  return (
    <div className="px-4 py-6">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link 
          to="/courses"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          Back to Courses
        </Link>
      </motion.div>

      {/* Course Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-6"
      >
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
              {course.level}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{course.duration}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{course.description}</p>
          
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm text-gray-600">{courseProgress.percentage}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${courseProgress.percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{course.lessons?.length || 0}</p>
              <p className="text-sm text-gray-600">Total Lessons</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{courseProgress.completed.length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{(course.lessons?.length || 0) - courseProgress.completed.length}</p>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">{courseProgress.percentage}%</p>
              <p className="text-sm text-gray-600">Progress</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lessons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
        
        <div className="space-y-3">
          {course.lessons?.map((lesson, index) => {
            const isCompleted = courseProgress.completed.includes(lesson.id);
            const LessonIcon = getIconForLessonType(lesson.type);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/courses/${courseId}/lessons/${lesson.id}`}
                  className={`block p-4 rounded-xl border transition-all hover:shadow-md ${
                    isCompleted 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      isCompleted ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-600" />
                      ) : (
                        <SafeIcon icon={LessonIcon} className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${
                          isCompleted ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <SafeIcon icon={FiClock} className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          lesson.type === 'video' ? 'bg-red-100 text-red-800' :
                          lesson.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {lesson.type}
                        </span>
                        {isCompleted && (
                          <span className="text-xs text-green-600 font-medium">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetail;