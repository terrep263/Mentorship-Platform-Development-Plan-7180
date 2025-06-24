import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiMoreVertical,
  FiEye,
  FiX,
  FiRefreshCw
} = FiIcons;

const SubscriptionTable = ({ subscriptions, onUpdate, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesPlan = planFilter === 'all' || sub.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800' },
      past_due: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      canceled: { bg: 'bg-red-100', text: 'text-red-800' },
      incomplete: { bg: 'bg-gray-100', text: 'text-gray-800' }
    };

    const config = statusConfig[status] || statusConfig.incomplete;

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const handleAction = async (subscriptionId, action) => {
    if (action === 'cancel') {
      if (window.confirm('Are you sure you want to cancel this subscription?')) {
        await onUpdate(subscriptionId, { status: 'canceled' });
      }
    } else if (action === 'reactivate') {
      await onUpdate(subscriptionId, { status: 'active' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="past_due">Past Due</option>
              <option value="canceled">Canceled</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Plans</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Billing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
                <motion.tr
                  key={subscription.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={subscription.customer.avatar}
                        alt={subscription.customer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {subscription.customer.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {subscription.customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 capitalize">
                        {subscription.plan}
                      </span>
                      <span className="text-sm text-gray-600">
                        ${(subscription.amount / 100).toFixed(2)}/
                        {subscription.plan === 'yearly' ? 'year' : 'month'}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {getStatusBadge(subscription.status)}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        ${subscription.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      {subscription.status === 'active' ? (
                        new Date(subscription.current_period_end).toLocaleDateString()
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      
                      {subscription.status === 'active' ? (
                        <button
                          onClick={() => handleAction(subscription.id, 'cancel')}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Cancel Subscription"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </button>
                      ) : subscription.status === 'canceled' ? (
                        <button
                          onClick={() => handleAction(subscription.id, 'reactivate')}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Reactivate Subscription"
                        >
                          <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiUser} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' || planFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No subscriptions have been created yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionTable;