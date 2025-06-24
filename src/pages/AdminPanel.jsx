import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiBook, FiFileText, FiDollarSign, FiPlus, FiEdit, FiTrash2, FiEye } = FiIcons;

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiEye },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'courses', label: 'Courses', icon: FiBook },
    { id: 'blog', label: 'Blog Posts', icon: FiFileText },
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign }
  ];

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeSubscriptions: 892,
    totalCourses: 12,
    monthlyRevenue: 25840,
    completionRate: 76
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'yearly', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'monthly', joined: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', plan: 'yearly', joined: '2024-01-13' }
  ];

  const courses = [
    { id: 1, title: 'Business Fundamentals', students: 234, completion: 78, status: 'active' },
    { id: 2, title: 'Digital Marketing', students: 189, completion: 82, status: 'active' },
    { id: 3, title: 'Leadership Skills', students: 156, completion: 71, status: 'draft' }
  ];

  const blogPosts = [
    { id: 1, title: 'Building Resilience', author: 'Sarah Johnson', published: '2024-01-15', views: 1250 },
    { id: 2, title: 'The Power of Networking', author: 'Mike Chen', published: '2024-01-14', views: 980 },
    { id: 3, title: 'Digital Marketing Trends', author: 'Emily Rodriguez', published: '2024-01-13', views: 1180 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <SafeIcon icon={FiUsers} className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
              <p className="text-sm text-gray-600">Active Subs</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-accent-100 p-2 rounded-lg">
              <SafeIcon icon={FiBook} className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              <p className="text-sm text-gray-600">Courses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">${(stats.monthlyRevenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-gray-600">Monthly Rev</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <SafeIcon icon={FiBook} className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
              <p className="text-sm text-gray-600">Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.plan === 'yearly' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.plan}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Courses</h3>
          <div className="space-y-3">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="py-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <span className="text-sm text-gray-600">{course.students} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${course.completion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{course.completion}% completion rate</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.plan === 'yearly' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-primary-600 hover:text-primary-700">
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            New Course
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                <td className="px-6 py-4 text-gray-600">{course.students}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{course.completion}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-primary-600 hover:text-primary-700">
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Blog Management</h3>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 text-gray-600">{post.author}</td>
                <td className="px-6 py-4 text-gray-600">{post.published}</td>
                <td className="px-6 py-4 text-gray-600">{post.views.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-primary-600 hover:text-primary-700">
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${stats.monthlyRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">+12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Revenue Per User</h3>
          <p className="text-3xl font-bold text-primary-600">${(stats.monthlyRevenue / stats.activeSubscriptions).toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-1">Per active subscription</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Churn Rate</h3>
          <p className="text-3xl font-bold text-red-600">2.3%</p>
          <p className="text-sm text-gray-600 mt-1">Monthly churn rate</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Monthly Subscriptions</span>
            <span className="font-semibold">${(stats.monthlyRevenue * 0.6).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Yearly Subscriptions</span>
            <span className="font-semibold">${(stats.monthlyRevenue * 0.4).toLocaleString()}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex items-center justify-between font-semibold">
              <span>Total Revenue</span>
              <span>${stats.monthlyRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'users': return renderUsers();
      case 'courses': return renderCourses();
      case 'blog': return renderBlog();
      case 'revenue': return renderRevenue();
      default: return renderOverview();
    }
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage your mentorship platform</p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex overflow-x-auto gap-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default AdminPanel;