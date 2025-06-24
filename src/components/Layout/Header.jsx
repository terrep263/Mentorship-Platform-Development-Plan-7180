import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useQuestAuth } from '../../contexts/QuestAuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBell, FiSettings, FiTarget } = FiIcons;

const Header = () => {
  const { user } = useAuth();
  const { user: questUser } = useQuestAuth();
  
  // Use Quest user if available, otherwise fall back to regular auth user
  const currentUser = questUser || user;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Welcome back, {currentUser?.name}
            </h1>
            <p className="text-xs text-gray-500 capitalize">{currentUser?.role || 'Member'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/get-started"
            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
            title="Get Started"
          >
            <SafeIcon icon={FiTarget} className="w-5 h-5" />
          </Link>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <SafeIcon icon={FiBell} className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <SafeIcon icon={FiSettings} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;