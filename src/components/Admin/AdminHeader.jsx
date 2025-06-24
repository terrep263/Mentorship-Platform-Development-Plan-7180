import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiBell, FiUser, FiSettings, FiLogOut, FiEye } = FiIcons;

const AdminHeader = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
        >
          <SafeIcon icon={FiMenu} className="w-5 h-5" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <span>Admin Dashboard</span>
          <span>•</span>
          <Link 
            to="/" 
            target="_blank"
            className="text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4" />
            View Site
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
          <SafeIcon icon={FiBell} className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <SafeIcon icon={FiSettings} className="w-4 h-4" />
            </button>
            <button 
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;