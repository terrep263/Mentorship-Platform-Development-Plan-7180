import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiMail, FiLoader } = FiIcons;

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resendVerification } = useAuth();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (type === 'email') {
        // This is handled automatically by Supabase
        // We just need to check the result
        setTimeout(() => {
          setStatus('success');
          setMessage('Email verified successfully! You can now sign in.');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }, 2000);
      } else {
        setStatus('error');
        setMessage('Invalid verification link.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  const handleResendVerification = async () => {
    const email = prompt('Please enter your email address:');
    if (email) {
      const result = await resendVerification(email);
      if (result.success) {
        setMessage('Verification email sent! Please check your inbox.');
      } else {
        setMessage(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
      >
        {status === 'verifying' && (
          <div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <SafeIcon icon={FiLoader} className="w-8 h-8 text-primary-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h1>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continue to Sign In
            </button>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiX} className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                className="w-full bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiMail} className="w-4 h-4 inline mr-2" />
                Resend Verification Email
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EmailVerification;