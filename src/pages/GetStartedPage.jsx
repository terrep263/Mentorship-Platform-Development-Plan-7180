import React from 'react';
import { motion } from 'framer-motion';
import { GetStarted } from '@questlabs/react-sdk';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import questConfig from '../config/questConfig';

const GetStartedPage = () => {
  const { user } = useQuestAuth();
  
  const getUserId = () => {
    // Try to get user ID from localStorage first, then from context, then fallback to config
    return localStorage.getItem('quest_userId') || 
           localStorage.getItem('userId') || 
           user?.id || 
           questConfig.USER_ID;
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
        <p className="text-gray-600">
          Complete these steps to make the most of your mentorship journey
        </p>
      </motion.div>

      {/* GetStarted Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border overflow-hidden"
      >
        <GetStarted
          questId={questConfig.GET_STARTED_QUESTID}
          uniqueUserId={getUserId()}
          accent={questConfig.PRIMARY_COLOR}
          autoHide={false}
        >
          <GetStarted.Header />
          <GetStarted.Progress />
          <GetStarted.Content />
          <GetStarted.Footer />
        </GetStarted>
      </motion.div>
    </div>
  );
};

export default GetStartedPage;