import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiUsers, FiBook, FiDollarSign } = FiIcons;

const AdminAnalytics = () => {
  const stats = [
    { label: 'Total Revenue', value: '$25,840', change: '+12%', color: 'green' },
    { label: 'New Users', value: '1,247', change: '+8%', color: 'blue' },
    { label: 'Course Completions', value: '456', change: '+15%', color: 'purple' },
    { label: 'Active Subscriptions', value: '892', change: '+5%', color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="text-gray-600 mt-1">Track your platform performance and user engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.color === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <SafeIcon 
                icon={index === 0 ? FiDollarSign : index === 1 ? FiUsers : index === 2 ? FiBook : FiTrendingUp} 
                className="w-8 h-8 text-gray-400" 
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;