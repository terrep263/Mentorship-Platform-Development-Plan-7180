import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiCreditCard,
  FiCalendar,
  FiDollarSign,
  FiSettings,
  FiX,
  FiAlertTriangle,
  FiCheck
} = FiIcons;

const SubscriptionStatus = ({ 
  subscription, 
  isActive, 
  onCancel, 
  onManage, 
  loading 
}) => {
  if (!subscription) return null;

  const getStatusColor = () => {
    if (subscription.cancel_at_period_end) return 'yellow';
    if (isActive) return 'green';
    return 'red';
  };

  const statusColor = getStatusColor();
  const statusConfig = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      icon: FiCheck,
      iconColor: 'text-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900',
      icon: FiAlertTriangle,
      iconColor: 'text-yellow-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      icon: FiX,
      iconColor: 'text-red-600'
    }
  };

  const config = statusConfig[statusColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-8 p-6 rounded-2xl border-2 ${config.bg} ${config.border}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <SafeIcon icon={config.icon} className={`w-5 h-5 ${config.iconColor}`} />
            <h3 className={`text-lg font-semibold ${config.text}`}>
              {subscription.cancel_at_period_end
                ? 'Subscription Ending'
                : isActive
                ? 'Active Subscription'
                : 'Subscription Inactive'}
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <SafeIcon icon={FiCreditCard} className="w-4 h-4" />
              <span className="capitalize">{subscription.plan} Plan</span>
            </div>
            <div className="flex items-center gap-1">
              <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
              <span>
                ${(subscription.amount / 100).toFixed(2)}/
                {subscription.plan === 'yearly' ? 'year' : 'month'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <SafeIcon icon={FiCalendar} className="w-4 h-4" />
              <span>
                {subscription.cancel_at_period_end ? 'Ends' : 'Next billing'}: {' '}
                {new Date(subscription.current_period_end).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onManage}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiSettings} className="w-4 h-4" />
            Manage
          </button>
          
          {isActive && !subscription.cancel_at_period_end && (
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </div>

      {subscription.cancel_at_period_end && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Your subscription will end on{' '}
            {new Date(subscription.current_period_end).toLocaleDateString()}.
            You'll continue to have access until then.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SubscriptionStatus;