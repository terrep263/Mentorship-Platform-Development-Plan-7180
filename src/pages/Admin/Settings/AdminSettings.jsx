import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiSettings, FiGlobe, FiMail, FiLock } = FiIcons;

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Mentorship Platform',
    siteDescription: 'Learn from industry experts and accelerate your growth',
    contactEmail: 'contact@mentorshipplatform.com',
    allowRegistration: true,
    requireEmailVerification: false,
    enableNotifications: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
        <p className="text-gray-600 mt-1">Manage your platform's general configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <SafeIcon icon={FiGlobe} className="w-5 h-5" />
            Site Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* User Registration */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <SafeIcon icon={FiLock} className="w-5 h-5" />
            User Registration
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="allowRegistration"
                checked={settings.allowRegistration}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">Allow Registration</span>
                <p className="text-sm text-gray-600">Allow new users to create accounts</p>
              </div>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">Require Email Verification</span>
                <p className="text-sm text-gray-600">Users must verify their email before accessing the platform</p>
              </div>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <SafeIcon icon={FiMail} className="w-5 h-5" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="enableNotifications"
                checked={settings.enableNotifications}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">Enable Notifications</span>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;