import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSubscription } from '../../contexts/SubscriptionContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiCheck, FiCreditCard, FiShield, FiArrowLeft, FiGift } = FiIcons;

const CheckoutForm = ({ selectedPlan, onBack, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { createSubscription } = useSubscription();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    company: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);

  // Mock promo codes
  const promoCodes = {
    'SAVE20': { type: 'percentage', value: 20, description: '20% off first month' },
    'WELCOME10': { type: 'percentage', value: 10, description: '10% off' },
    'STUDENT': { type: 'fixed', value: 10, description: '$10 off' }
  };

  const applyPromoCode = () => {
    const code = promoCodes[promoCode.toUpperCase()];
    if (code) {
      setDiscount(code);
      setError('');
    } else {
      setError('Invalid promo code');
      setDiscount(null);
    }
  };

  const calculateTotal = () => {
    let total = selectedPlan.price;
    if (discount) {
      if (discount.type === 'percentage') {
        total = total * (1 - discount.value / 100);
      } else {
        total = Math.max(0, total - discount.value);
      }
    }
    return total;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      const cardElement = elements.getElement(CardElement);
      
      // Create payment method
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
        },
      });

      if (paymentError) {
        setError(paymentError.message);
        setLoading(false);
        return;
      }

      // Create subscription
      const result = await createSubscription({
        planId: selectedPlan.id,
        paymentMethodId: paymentMethod.id,
        customerInfo,
        promoCode: discount ? promoCode : null
      });

      if (result.success) {
        onSuccess(result);
      } else {
        setError(result.error || 'Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        '::placeholder': {
          color: '#9CA3AF',
        },
      },
    },
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2].map((stepNum) => (
        <React.Fragment key={stepNum}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step >= stepNum 
              ? 'bg-primary-600 border-primary-600 text-white' 
              : 'border-gray-300 text-gray-400'
          }`}>
            {step > stepNum ? (
              <SafeIcon icon={FiCheck} className="w-4 h-4" />
            ) : (
              stepNum
            )}
          </div>
          {stepNum < 2 && (
            <div className={`w-16 h-0.5 ${
              step > stepNum ? 'bg-primary-600' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company (Optional)
            </label>
            <input
              type="text"
              value={customerInfo.company}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your Company"
            />
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Promo Code</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter promo code"
          />
          <button
            type="button"
            onClick={applyPromoCode}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Apply
          </button>
        </div>
        {discount && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <SafeIcon icon={FiGift} className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">{discount.description} applied!</span>
          </div>
        )}
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!customerInfo.email || !customerInfo.name}
        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
          Payment Information
        </h3>
        
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          <CardElement
            options={cardElementOptions}
            onChange={(event) => {
              setCardComplete(event.complete);
              if (event.error) {
                setError(event.error.message);
              } else {
                setError('');
              }
            }}
          />
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <SafeIcon icon={FiShield} className="w-4 h-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
          Back
        </button>
        
        <button
          type="submit"
          disabled={loading || !cardComplete}
          className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <SafeIcon icon={FiLock} className="w-4 h-4" />
              Complete Purchase
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {renderStepIndicator()}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 ? renderStep1() : renderStep2()}
      </AnimatePresence>
      
      {/* Order Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{selectedPlan.name}</span>
            <span>${selectedPlan.price}</span>
          </div>
          {discount && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({promoCode})</span>
              <span>
                -{discount.type === 'percentage' 
                  ? `${discount.value}%` 
                  : `$${discount.value}`}
              </span>
            </div>
          )}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;