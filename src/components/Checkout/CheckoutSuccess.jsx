import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiArrowRight, FiMail, FiCalendar, FiGift } = FiIcons;

const CheckoutSuccess = ({ paymentResult, selectedPlan, onClose }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onClose();
    navigate('/dashboard');
  };

  const benefits = [
    {
      icon: FiCheck,
      title: 'Instant Access',
      description: 'Access all courses and content immediately'
    },
    {
      icon: FiMail,
      title: 'Welcome Email',
      description: 'Check your inbox for getting started guide'
    },
    {
      icon: FiCalendar,
      title: 'Flexible Billing',
      description: 'Cancel or modify your plan anytime'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <SafeIcon icon={FiCheck} className="w-10 h-10 text-green-600" />
      </motion.div>

      {/* Success Message */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Payment Successful!
      </h3>
      <p className="text-gray-600 mb-8">
        Welcome to your mentorship journey. Your {selectedPlan?.name} subscription is now active.
      </p>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Order Details</h4>
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Plan:</span>
            <span className="font-medium">{selectedPlan?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">${selectedPlan?.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Billing:</span>
            <span className="font-medium">Every {selectedPlan?.interval}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600 font-medium flex items-center gap-1">
              <SafeIcon icon={FiCheck} className="w-4 h-4" />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid gap-4 mb-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-start gap-3 p-4 bg-primary-50 rounded-lg"
          >
            <div className="bg-primary-100 p-2 rounded-lg">
              <SafeIcon icon={benefit.icon} className="w-4 h-4 text-primary-600" />
            </div>
            <div className="text-left">
              <h5 className="font-medium text-gray-900">{benefit.title}</h5>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Special Offer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl p-6 mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <SafeIcon icon={FiGift} className="w-5 h-5" />
          <span className="font-semibold">Bonus Content Unlocked!</span>
        </div>
        <p className="text-sm text-accent-100">
          As a new subscriber, you've unlocked exclusive bonus materials and a free 30-minute mentoring session.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleGetStarted}
          className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          Get Started
          <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 mt-6">
        You'll receive a confirmation email shortly. If you have any questions, contact our support team.
      </p>
    </motion.div>
  );
};

export default CheckoutSuccess;