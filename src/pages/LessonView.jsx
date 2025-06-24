import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { useCourses } from '../contexts/CourseContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiCheck, FiChevronRight, FiChevronLeft, FiPlay, FiPause } = FiIcons;

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { courses, progress, markLessonComplete } = useCourses();
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons?.find(l => l.id === lessonId);
  const courseProgress = progress[courseId] || { completed: [], total: 0, percentage: 0 };
  
  const currentIndex = course?.lessons?.findIndex(l => l.id === lessonId) || 0;
  const nextLesson = course?.lessons?.[currentIndex + 1];
  const prevLesson = course?.lessons?.[currentIndex - 1];

  useEffect(() => {
    setCompleted(courseProgress.completed.includes(lessonId));
  }, [courseProgress, lessonId]);

  if (!course || !lesson) {
    return (
      <div className="px-4 py-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson not found</h1>
        <Link to="/courses" className="text-primary-600 hover:text-primary-700">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const handleMarkComplete = () => {
    markLessonComplete(courseId, lessonId);
    setCompleted(true);
  };

  const handleNext = () => {
    if (nextLesson) {
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (prevLesson) {
      navigate(`/courses/${courseId}/lessons/${prevLesson.id}`);
    }
  };

  const renderContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="bg-black rounded-xl overflow-hidden">
            <ReactPlayer
              url={lesson.content}
              width="100%"
              height="400px"
              controls
              playing={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        );
      
      case 'audio':
        return (
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 rounded-xl text-white">
            <div className="text-center mb-6">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
              <p className="opacity-90">{lesson.duration}</p>
            </div>
            <audio 
              controls 
              className="w-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={lesson.content} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      
      case 'text':
      default:
        return (
          <div className="bg-white p-6 rounded-xl border">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-gray-700">
                {lesson.content}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <Link 
          to={`/courses/${courseId}`}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          Back to Course
        </Link>
        
        <div className="text-sm text-gray-600">
          Lesson {currentIndex + 1} of {course.lessons?.length || 0}
        </div>
      </motion.div>

      {/* Lesson Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            lesson.type === 'video' ? 'bg-red-100 text-red-800' :
            lesson.type === 'audio' ? 'bg-purple-100 text-purple-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">{lesson.duration}</span>
          {completed && (
            <>
              <span className="text-gray-500">•</span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                Completed
              </span>
            </>
          )}
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
        <p className="text-lg text-gray-600">{lesson.description}</p>
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        {renderContent()}
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={!prevLesson}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!nextLesson}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
          </button>
        </div>
        
        {!completed && (
          <button
            onClick={handleMarkComplete}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <SafeIcon icon={FiCheck} className="w-5 h-5" />
            Mark as Complete
          </button>
        )}
      </motion.div>

      {/* Embedded Tools Section */}
      {lesson.embeddedTools && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl shadow-sm border p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Tools</h3>
          <div className="space-y-4">
            {lesson.embeddedTools.map((tool, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <h4 className="font-medium text-gray-900">{tool.name}</h4>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
                <iframe 
                  src={tool.url}
                  className="w-full h-96"
                  frameBorder="0"
                  title={tool.name}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LessonView;