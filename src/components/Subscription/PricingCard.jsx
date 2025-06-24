import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiStar } = FiIcons;

const PricingCard = ({ plan, isPopular, onSelect, loading, currentPlan, isActive }) => {
  const isCurrentPlan = currentPlan === plan.id && isActive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
        isPopular ? 'border-primary-500 ring-4 ring-primary-100' : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <SafeIcon icon={FiStar} className="w-3 h-3" />
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
        {plan.interval === 'year' && plan.discount && (
          <p className="text-sm text-green-600 mt-1">{plan.discount}</p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        disabled={loading || isCurrentPlan}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          isPopular
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isCurrentPlan
          ? 'Current Plan'
          : loading
          ? 'Processing...'
          : 'Get Started'}
      </button>
    </motion.div>
  );
};

export default PricingCard;