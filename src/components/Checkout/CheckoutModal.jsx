import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiArrowLeft } = FiIcons;

const CheckoutModal = ({ isOpen, onClose, selectedPlan, stripePromise }) => {
  const [step, setStep] = useState('checkout'); // 'checkout' | 'success'
  const [paymentResult, setPaymentResult] = useState(null);

  const handleSuccess = (result) => {
    setPaymentResult(result);
    setStep('success');
  };

  const handleClose = () => {
    setStep('checkout');
    setPaymentResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === 'success' && (
                  <button
                    onClick={() => setStep('checkout')}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {step === 'checkout' ? 'Complete Your Purchase' : 'Welcome Aboard!'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {step === 'checkout' 
                      ? `${selectedPlan?.name} - $${selectedPlan?.price}/${selectedPlan?.interval}`
                      : 'Your subscription is now active'
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 'checkout' ? (
                <Elements stripe={stripePromise} key="checkout">
                  <CheckoutForm
                    selectedPlan={selectedPlan}
                    onBack={() => setStep('plan-selection')}
                    onSuccess={handleSuccess}
                  />
                </Elements>
              ) : (
                <CheckoutSuccess
                  key="success"
                  paymentResult={paymentResult}
                  selectedPlan={selectedPlan}
                  onClose={handleClose}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Trust Indicators */}
          {step === 'checkout' && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiIcons.FiShield} className="w-3 h-3" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiIcons.FiCreditCard} className="w-3 h-3" />
                  <span>Stripe Powered</span>
                </div>
                <div className="flex items-center gap-1">
                  <SafeIcon icon={FiIcons.FiRefreshCw} className="w-3 h-3" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;