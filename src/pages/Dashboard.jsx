import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useCourses } from '../contexts/CourseContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiClock, FiTrendingUp, FiPlay, FiFileText, FiTarget } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { user: questUser } = useQuestAuth();
  const { subscription } = useSubscription();
  const { courses, progress } = useCourses();

  // Use Quest user if available, otherwise fall back to regular auth user
  const currentUser = questUser || user;

  const recentPosts = [
    {
      id: '1',
      title: 'Building Resilience in Business',
      excerpt: 'Learn how to bounce back from setbacks and build a stronger business foundation.',
      date: '2024-01-15',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'The Power of Networking',
      excerpt: 'Discover effective networking strategies that can accelerate your career growth.',
      date: '2024-01-14',
      readTime: '7 min read'
    }
  ];

  const completedCourses = Object.values(progress).filter(p => p.percentage === 100).length;
  const totalLessons = Object.values(progress).reduce((sum, p) => sum + p.total, 0);
  const completedLessons = Object.values(progress).reduce((sum, p) => sum + p.completed.length, 0);

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-2xl"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
        <p className="opacity-90">Ready to continue your learning journey?</p>
        {subscription && (
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {subscription.plan} Plan
            </span>
            <span>
              Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
            </span>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl shadow-sm border p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/get-started"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="bg-primary-100 p-3 rounded-lg">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Get Started Guide</h3>
              <p className="text-sm text-gray-600">Complete your setup and onboarding</p>
            </div>
          </Link>
          <Link
            to="/courses"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="bg-accent-100 p-3 rounded-lg">
              <SafeIcon icon={FiBook} className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Browse Courses</h3>
              <p className="text-sm text-gray-600">Explore our course library</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <SafeIcon icon={FiBook} className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              <p className="text-sm text-gray-600">Courses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-accent-100 p-2 rounded-lg">
              <SafeIcon icon={FiClock} className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedLessons}</p>
              <p className="text-sm text-gray-600">Lessons Done</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <SafeIcon icon={FiPlay} className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalLessons}</p>
              <p className="text-sm text-gray-600">Total Lessons</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continue Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
          <Link
            to="/courses"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {courses.slice(0, 2).map((course) => {
            const courseProgress = progress[course.id] || { percentage: 0 };
            return (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="block p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${courseProgress.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{courseProgress.percentage}% complete</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Blog Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Insights</h2>
          <Link
            to="/blog"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="block p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <SafeIcon icon={FiFileText} className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;