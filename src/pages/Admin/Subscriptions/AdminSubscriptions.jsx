import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SubscriptionTable from '../../../components/Admin/Subscriptions/SubscriptionTable';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiCreditCard
} = FiIcons;

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeSubscriptions: 0,
    monthlyRecurring: 0,
    churnRate: 0,
    growthRate: 0
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockSubscriptions = [
        {
          id: 'sub_1',
          customer: {
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0284c7&color=fff'
          },
          plan: 'monthly',
          status: 'active',
          amount: 2900, // $29.00
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          totalRevenue: 87,
          created_at: '2024-01-15'
        },
        {
          id: 'sub_2',
          customer: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0284c7&color=fff'
          },
          plan: 'yearly',
          status: 'active',
          amount: 29000, // $290.00
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          totalRevenue: 290,
          created_at: '2024-01-10'
        },
        {
          id: 'sub_3',
          customer: {
            name: 'Mike Johnson',
            email: 'mike@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=0284c7&color=fff'
          },
          plan: 'monthly',
          status: 'past_due',
          amount: 2900,
          current_period_end: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          totalRevenue: 58,
          created_at: '2024-01-08'
        }
      ];

      setSubscriptions(mockSubscriptions);
      
      // Calculate stats
      const activeCount = mockSubscriptions.filter(s => s.status === 'active').length;
      const totalRevenue = mockSubscriptions.reduce((sum, s) => sum + s.totalRevenue, 0);
      const monthlyRevenue = mockSubscriptions
        .filter(s => s.status === 'active')
        .reduce((sum, s) => sum + (s.amount / 100), 0);

      setStats({
        totalRevenue,
        activeSubscriptions: activeCount,
        monthlyRecurring: monthlyRevenue,
        churnRate: 2.3,
        growthRate: 12.5
      });
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubscription = async (subscriptionId, updates) => {
    try {
      // Mock update - replace with actual API call
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === subscriptionId 
            ? { ...sub, ...updates }
            : sub
        )
      );
      
      // Reload stats
      await loadSubscriptions();
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const StatCard = ({ title, value, change, icon, color, prefix = '', suffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <SafeIcon 
                icon={change >= 0 ? FiTrendingUp : FiTrendingDown} 
                className="w-4 h-4" 
              />
              <span>{Math.abs(change)}%</span>
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage customer subscriptions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={stats.growthRate}
          icon={FiDollarSign}
          color="bg-green-500"
          prefix="$"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          change={8.2}
          icon={FiUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Monthly Recurring"
          value={stats.monthlyRecurring}
          change={5.7}
          icon={FiCreditCard}
          color="bg-purple-500"
          prefix="$"
        />
        <StatCard
          title="Churn Rate"
          value={stats.churnRate}
          change={-1.2}
          icon={FiTrendingDown}
          color="bg-red-500"
          suffix="%"
        />
        <StatCard
          title="Growth Rate"
          value={stats.growthRate}
          change={3.4}
          icon={FiTrendingUp}
          color="bg-orange-500"
          suffix="%"
        />
      </div>

      {/* Revenue Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-sm border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <div className="flex items-center gap-2">
            <SafeIcon icon={FiCalendar} className="w-4 h-4 text-gray-400" />
            <select className="text-sm border border-gray-300 rounded px-2 py-1">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Revenue chart will be implemented here</p>
        </div>
      </motion.div>

      {/* Subscriptions Table */}
      <SubscriptionTable
        subscriptions={subscriptions}
        onUpdate={handleUpdateSubscription}
        loading={loading}
      />
    </div>
  );
};

export default AdminSubscriptions;