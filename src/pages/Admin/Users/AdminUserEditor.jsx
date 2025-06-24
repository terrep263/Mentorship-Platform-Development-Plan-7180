import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiArrowLeft, FiUser, FiMail, FiShield } = FiIcons;

const AdminUserEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUserRole, getAllUsers } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    role: 'mentee'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { value: 'admin', label: 'Administrator', description: 'Full access to all features' },
    { value: 'mentor', label: 'Mentor', description: 'Can create content and mentor users' },
    { value: 'mentee', label: 'Mentee', description: 'Standard user access' }
  ];

  useEffect(() => {
    if (isEditing) {
      loadUserData();
    }
  }, [id, isEditing]);

  const loadUserData = async () => {
    try {
      const result = await getAllUsers();
      if (result.success) {
        const user = result.data.find(u => u.id === id);
        if (user) {
          setFormData({
            email: user.email,
            full_name: user.full_name,
            role: user.role
          });
        }
      }
    } catch (error) {
      setError('Failed to load user data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        const result = await updateUserRole(id, formData.role);
        if (result.success) {
          navigate('/admin/users');
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/users"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          Back to Users
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit User' : 'Add New User'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiMail} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isEditing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="user@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiUser} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={isEditing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiShield} className="w-4 h-4 inline mr-1" />
              User Role
            </label>
            <div className="space-y-3">
              {roles.map((role) => (
                <label key={role.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{role.label}</p>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Link
              to="/admin/users"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              {loading ? 'Saving...' : (isEditing ? 'Update User' : 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserEditor;