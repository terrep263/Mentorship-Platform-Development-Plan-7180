import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Mock subscription data - replace with Stripe integration
      const mockSubscription = {
        id: 'sub_mock_123',
        status: 'active',
        plan: 'monthly',
        amount: 2900, // $29.00
        currency: 'usd',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancel_at_period_end: false
      };
      setSubscription(mockSubscription);
    }
    setLoading(false);
  }, [user]);

  const createSubscription = async (priceId) => {
    try {
      // Mock Stripe checkout - replace with real Stripe integration
      console.log('Creating subscription for price:', priceId);
      return {
        success: true,
        url: 'https://checkout.stripe.com/mock-session'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const cancelSubscription = async () => {
    try {
      // Mock cancellation - replace with Stripe API
      setSubscription(prev => ({
        ...prev,
        cancel_at_period_end: true
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const isActive = subscription?.status === 'active' && !subscription?.cancel_at_period_end;

  const value = {
    subscription,
    loading,
    createSubscription,
    cancelSubscription,
    isActive
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};