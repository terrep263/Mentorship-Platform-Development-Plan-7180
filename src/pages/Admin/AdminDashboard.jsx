import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUsers, FiBook, FiFileText, FiDollarSign, FiTrendingUp,
  FiPlus, FiEye, FiEdit, FiArrowUp, FiArrowDown
} = FiIcons;

const AdminDashboard = () => {
  // Mock data - replace with real data from your backend
  const stats = {
    totalUsers: 1247,
    activeSubscriptions: 892,
    totalCourses: 12,
    totalPosts: 45,
    monthlyRevenue: 25840,
    completionRate: 76,
    trends: {
      users: 12.5,
      subscriptions: 8.3,
      revenue: 15.2,
      courses: -2.1
    }
  };

  const recentActivity = [
    { type: 'user', message: 'New user John Doe registered', time: '2 minutes ago' },
    { type: 'course', message: 'Course "Business Fundamentals" completed by 5 users', time: '15 minutes ago' },
    { type: 'post', message: 'New blog post "Leadership Tips" published', time: '1 hour ago' },
    { type: 'subscription', message: '3 new yearly subscriptions this hour', time: '2 hours ago' }
  ];

  const quickActions = [
    { label: 'Add New Post', path: '/admin/posts/new', icon: FiFileText, color: 'bg-blue-500' },
    { label: 'Add New Course', path: '/admin/courses/new', icon: FiBook, color: 'bg-green-500' },
    { label: 'Add New User', path: '/admin/users/new', icon: FiUsers, color: 'bg-purple-500' },
    { label: 'View Analytics', path: '/admin/analytics', icon: FiTrendingUp, color: 'bg-orange-500' }
  ];

  const StatCard = ({ title, value, trend, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <SafeIcon icon={trend > 0 ? FiArrowUp : FiArrowDown} className="w-4 h-4" />
              <span>{Math.abs(trend)}%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <SafeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/analytics"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4" />
            View Reports
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          trend={stats.trends.users}
          icon={FiUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          trend={stats.trends.subscriptions}
          icon={FiDollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          trend={stats.trends.courses}
          icon={FiBook}
          color="bg-purple-500"
        />
        <StatCard
          title="Blog Posts"
          value={stats.totalPosts}
          icon={FiFileText}
          color="bg-orange-500"
        />
      </div>

      {/* Revenue Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 mb-1">Monthly Revenue</p>
            <p className="text-3xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2">
              <SafeIcon icon={FiArrowUp} className="w-4 h-4" />
              <span>{stats.trends.revenue}% increase from last month</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary-100 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold">{stats.completionRate}%</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-900">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'course' ? 'bg-green-100 text-green-600' :
                  activity.type === 'post' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <SafeIcon 
                    icon={
                      activity.type === 'user' ? FiUsers :
                      activity.type === 'course' ? FiBook :
                      activity.type === 'post' ? FiFileText :
                      FiDollarSign
                    } 
                    className="w-4 h-4" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-sm border"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          <Link 
            to="/admin/analytics"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Detailed Analytics →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 mb-1">89%</p>
            <p className="text-sm text-gray-600">User Satisfaction</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 mb-1">4.8</p>
            <p className="text-sm text-gray-600">Average Course Rating</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 mb-1">2.3%</p>
            <p className="text-sm text-gray-600">Monthly Churn Rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;