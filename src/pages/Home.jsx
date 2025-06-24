import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiPlay, FiUsers, FiAward } = FiIcons;

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Master Your
            <span className="text-primary-600"> Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our exclusive mentorship platform and unlock your potential with expert guidance, 
            structured courses, and a supportive community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              Get Started
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
              <SafeIcon icon={FiPlay} className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Mentorship</h3>
            <p className="text-gray-600">Learn from industry leaders with proven track records</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-accent-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiPlay} className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rich Content</h3>
            <p className="text-gray-600">Videos, audio, interactive tools, and downloadable resources</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiAward} className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your learning journey and celebrate milestones</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Career?</h3>
            <p className="text-gray-600 mb-6">Join thousands of successful mentees who've accelerated their growth</p>
            <Link
              to="/login"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-block"
            >
              Start Your Journey
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;