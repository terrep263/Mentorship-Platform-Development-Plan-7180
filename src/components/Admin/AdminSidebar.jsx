import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiHome, FiUsers, FiBook, FiFileText, FiDollarSign, FiSettings,
  FiPalette, FiBarChart3, FiTags, FiMail, FiShield, FiDatabase,
  FiMonitor, FiChevronDown, FiChevronRight, FiChevronLeft
} = FiIcons;

const AdminSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = React.useState(['content']);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FiHome,
      path: '/admin',
      exact: true
    },
    {
      id: 'content',
      label: 'Content',
      icon: FiFileText,
      submenu: [
        { label: 'All Posts', path: '/admin/posts', icon: FiFileText },
        { label: 'Add New Post', path: '/admin/posts/new', icon: FiFileText },
        { label: 'Categories', path: '/admin/categories', icon: FiTags },
        { label: 'Blog Settings', path: '/admin/blog-settings', icon: FiSettings }
      ]
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: FiBook,
      submenu: [
        { label: 'All Courses', path: '/admin/courses', icon: FiBook },
        { label: 'Add New Course', path: '/admin/courses/new', icon: FiBook },
        { label: 'Lessons', path: '/admin/lessons', icon: FiMonitor },
        { label: 'Course Settings', path: '/admin/course-settings', icon: FiSettings }
      ]
    },
    {
      id: 'users',
      label: 'Users',
      icon: FiUsers,
      submenu: [
        { label: 'All Users', path: '/admin/users', icon: FiUsers },
        { label: 'Add New User', path: '/admin/users/new', icon: FiUsers },
        { label: 'User Roles', path: '/admin/user-roles', icon: FiShield },
        { label: 'User Analytics', path: '/admin/user-analytics', icon: FiBarChart3 }
      ]
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: FiDollarSign,
      submenu: [
        { label: 'All Subscriptions', path: '/admin/subscriptions', icon: FiDollarSign },
        { label: 'Plans & Pricing', path: '/admin/subscription-plans', icon: FiDollarSign },
        { label: 'Payment History', path: '/admin/payments', icon: FiBarChart3 },
        { label: 'Revenue Analytics', path: '/admin/revenue', icon: FiBarChart3 }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: FiBarChart3,
      submenu: [
        { label: 'Overview', path: '/admin/analytics', icon: FiBarChart3 },
        { label: 'Content Performance', path: '/admin/analytics/content', icon: FiFileText },
        { label: 'User Engagement', path: '/admin/analytics/engagement', icon: FiUsers },
        { label: 'Course Progress', path: '/admin/analytics/courses', icon: FiBook }
      ]
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: FiPalette,
      submenu: [
        { label: 'Theme Customizer', path: '/admin/theme', icon: FiPalette },
        { label: 'Menus', path: '/admin/menus', icon: FiSettings },
        { label: 'Widgets', path: '/admin/widgets', icon: FiMonitor }
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: FiSettings,
      submenu: [
        { label: 'Import/Export', path: '/admin/import-export', icon: FiDatabase },
        { label: 'Site Health', path: '/admin/site-health', icon: FiShield },
        { label: 'Email Settings', path: '/admin/email', icon: FiMail }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FiSettings,
      submenu: [
        { label: 'General', path: '/admin/settings/general', icon: FiSettings },
        { label: 'Security', path: '/admin/settings/security', icon: FiShield },
        { label: 'Performance', path: '/admin/settings/performance', icon: FiBarChart3 },
        { label: 'Integrations', path: '/admin/settings/integrations', icon: FiDatabase }
      ]
    }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 256 : 64 }}
        className="fixed left-0 top-0 h-full bg-white shadow-lg z-30 border-r border-gray-200"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="font-bold text-gray-900">Mentorship Admin</h1>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  /* Menu with Submenu */
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        location.pathname.includes(`/admin/${item.id}`) || expandedMenus.includes(item.id)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <SafeIcon icon={item.icon} className="w-5 h-5 mr-3 flex-shrink-0" />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          <SafeIcon 
                            icon={expandedMenus.includes(item.id) ? FiChevronDown : FiChevronRight} 
                            className="w-4 h-4" 
                          />
                        </>
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {isOpen && expandedMenus.includes(item.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 mt-1 space-y-1"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-primary-100 text-primary-800 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <SafeIcon icon={subItem.icon} className="w-4 h-4 mr-3" />
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  /* Single Menu Item */
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path, item.exact)
                        ? 'bg-primary-100 text-primary-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <SafeIcon icon={item.icon} className="w-5 h-5 mr-3 flex-shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon 
              icon={isOpen ? FiChevronLeft : FiChevronRight} 
              className="w-5 h-5" 
            />
            {isOpen && <span className="ml-2">Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;