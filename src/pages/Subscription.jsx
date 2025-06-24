import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubscription } from '../contexts/SubscriptionContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiCreditCard, FiCalendar, FiDollarSign, FiSettings } = FiIcons;

const Subscription = () => {
  const { subscription, createSubscription, cancelSubscription, isActive } = useSubscription();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 29,
      interval: 'month',
      features: [
        'Access to all courses',
        'Daily blog posts and insights',
        'Community access',
        'Mobile app access',
        'Email support'
      ]
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 290,
      interval: 'year',
      features: [
        'Access to all courses',
        'Daily blog posts and insights',
        'Community access',
        'Mobile app access',
        'Priority email support',
        'Monthly 1-on-1 mentoring call',
        'Exclusive workshops',
        'Save $58 per year'
      ],
      popular: true
    }
  ];

  const handleSubscribe = async (planId) => {
    setLoading(true);
    try {
      const result = await createSubscription(planId);
      if (result.success) {
        // In a real app, redirect to Stripe checkout
        window.open(result.url, '_blank');
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      setLoading(true);
      try {
        await cancelSubscription();
      } catch (error) {
        console.error('Cancellation error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openCustomerPortal = () => {
    // In a real app, this would redirect to Stripe customer portal
    window.open('https://billing.stripe.com/p/login/test_example', '_blank');
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h1>
        <p className="text-gray-600">Unlock your potential with our mentorship platform</p>
      </motion.div>

      {/* Current Subscription Status */}
      {subscription && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-8 p-6 rounded-2xl border-2 ${
            isActive 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-semibold ${
                isActive ? 'text-green-900' : 'text-yellow-900'
              }`}>
                {isActive ? 'Active Subscription' : 'Subscription Ending'}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiCreditCard} className="w-4 h-4" />
                  <span className="capitalize">{subscription.plan} Plan</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                  <span>${(subscription.amount / 100).toFixed(2)}/{subscription.plan === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={openCustomerPortal}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SafeIcon icon={FiSettings} className="w-4 h-4" />
                Manage
              </button>
              
              {isActive && (
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
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
                Your subscription will end on {new Date(subscription.current_period_end).toLocaleDateString()}. 
                You'll continue to have access until then.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Pricing Plans */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
              plan.popular 
                ? 'border-primary-500 ring-4 ring-primary-100' 
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600 ml-1">/{plan.interval}</span>
              </div>
              {plan.interval === 'year' && (
                <p className="text-sm text-green-600 mt-1">Save $58 per year</p>
              )}
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading || (subscription?.plan === plan.id && isActive)}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                plan.popular
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {subscription?.plan === plan.id && isActive 
                ? 'Current Plan' 
                : loading 
                  ? 'Processing...' 
                  : 'Get Started'
              }
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Comparison */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-white rounded-2xl shadow-sm border p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Expert Content</h4>
            <p className="text-gray-600">Access to comprehensive courses and daily insights from industry experts</p>
          </div>
          
          <div className="text-center">
            <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiSettings} className="w-8 h-8 text-accent-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Interactive Tools</h4>
            <p className="text-gray-600">Embedded tools and resources to enhance your learning experience</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCreditCard} className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Flexible Billing</h4>
            <p className="text-gray-600">Cancel anytime with no hidden fees or long-term commitments</p>
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-white rounded-2xl shadow-sm border p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
            <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600">We accept all major credit cards and debit cards through our secure Stripe payment processing.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
            <p className="text-gray-600">We offer a 7-day money-back guarantee. If you're not satisfied within the first week, we'll refund your payment.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Subscription;