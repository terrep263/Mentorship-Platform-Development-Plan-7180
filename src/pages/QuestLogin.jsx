import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiUsers, FiTrendingUp, FiAward } = FiIcons;

const QuestLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isOnboardingCompleted } = useQuestAuth();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate authentication
      const userId = `u-${Date.now()}`;
      const token = `token-${Date.now()}`;
      const newUser = isSignUp;
      
      const userData = {
        userId,
        token,
        newUser,
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || formData.email.split('@')[0])}&background=0284c7&color=fff`
      };

      login(userData);
      
      // Navigate based on user status
      if (newUser || !isOnboardingCompleted()) {
        navigate('/onboarding', { replace: true });
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome to Your
            <span className="block text-primary-200">Learning Journey</span>
          </h1>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Join our mentorship platform to unlock your potential with expert guidance, 
            structured courses, and a supportive community.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white">
              <div className="bg-white/20 p-2 rounded-lg">
                <SafeIcon icon={FiUsers} className="w-6 h-6" />
              </div>
              <span className="text-lg">Expert mentorship and guidance</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="bg-white/20 p-2 rounded-lg">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6" />
              </div>
              <span className="text-lg">Track your progress and growth</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="bg-white/20 p-2 rounded-lg">
                <SafeIcon icon={FiAward} className="w-6 h-6" />
              </div>
              <span className="text-lg">Achieve your learning goals</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Authentication */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {isSignUp ? 'Start your learning journey' : 'Sign in to continue your journey'}
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="text-gray-600">
                {isSignUp 
                  ? 'Join our mentorship platform' 
                  : 'Access your personalized learning experience'
                }
              </p>
            </div>

            {loading && (
              <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-lg text-center">
                {isSignUp ? 'Creating your account...' : 'Signing you in...'}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-center text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Demo Access:</p>
              <p className="text-xs text-gray-600">
                Use any email address and password to access the platform. 
                New users will be guided through onboarding.
              </p>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="mt-8 lg:hidden">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
                <span className="text-gray-700">Expert mentorship</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-primary-600" />
                <span className="text-gray-700">Progress tracking</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestLoginPage;