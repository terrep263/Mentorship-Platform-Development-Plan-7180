import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiBook, FiFileText, FiCreditCard, FiSettings, FiTarget } = FiIcons;

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/get-started', icon: FiTarget, label: 'Get Started' },
    { path: '/courses', icon: FiBook, label: 'Courses' },
    { path: '/blog', icon: FiFileText, label: 'Blog' },
    { path: '/subscription', icon: FiCreditCard, label: 'Subscription' }
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', icon: FiSettings, label: 'Admin' });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon
                icon={item.icon}
                className={`w-5 h-5 mb-1 ${isActive ? 'text-primary-600' : ''}`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;