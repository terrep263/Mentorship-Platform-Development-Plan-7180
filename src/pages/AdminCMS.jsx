import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../contexts/CMSContext';
import { useTheme } from '../contexts/ThemeContext';
import { useBlogPosts, useCourses } from '../hooks/useSupabase';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSave, FiX, FiPalette, FiSettings, FiFileText, FiBook } = FiIcons;

const AdminCMS = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [contentType, setContentType] = useState('blog');
  
  const { posts, refetch: refetchPosts } = useBlogPosts();
  const { courses, refetch: refetchCourses } = useCourses();
  const { createBlogPost, updateBlogPost, deleteBlogPost, createCourse, updateCourse, deleteCourse, loading } = useCMS();
  const { colors, updateThemeColors, resetToDefaultColors, generateColorPalette } = useTheme();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    is_published: false,
    is_featured: false,
    tags: []
  });

  const [colorCustomizer, setColorCustomizer] = useState({
    primary: colors.primary?.['600'] || '#0284c7',
    accent: colors.accent?.['600'] || '#d97706',
    success: colors.success?.['600'] || '#059669',
    error: colors.error?.['600'] || '#dc2626'
  });

  const tabs = [
    { id: 'content', label: 'Content Management', icon: FiFileText },
    { id: 'theme', label: 'Theme Customizer', icon: FiPalette },
    { id: 'settings', label: 'Site Settings', icon: FiSettings }
  ];

  const handleCreateContent = async (e) => {
    e.preventDefault();
    let result;
    
    if (contentType === 'blog') {
      result = await createBlogPost(formData);
    } else {
      result = await createCourse(formData);
    }

    if (result.success) {
      setShowCreateModal(false);
      resetForm();
      contentType === 'blog' ? refetchPosts() : refetchCourses();
    }
  };

  const handleUpdateContent = async (e) => {
    e.preventDefault();
    let result;
    
    if (contentType === 'blog') {
      result = await updateBlogPost(editingItem.id, formData);
    } else {
      result = await updateCourse(editingItem.id, formData);
    }

    if (result.success) {
      setEditingItem(null);
      resetForm();
      contentType === 'blog' ? refetchPosts() : refetchCourses();
    }
  };

  const handleDeleteContent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    let result;
    if (contentType === 'blog') {
      result = await deleteBlogPost(id);
    } else {
      result = await deleteCourse(id);
    }

    if (result.success) {
      contentType === 'blog' ? refetchPosts() : refetchCourses();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      is_published: false,
      is_featured: false,
      tags: []
    });
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content || item.description,
      excerpt: item.excerpt || '',
      is_published: item.is_published,
      is_featured: item.is_featured,
      tags: item.tags || []
    });
  };

  const handleColorChange = (colorType, value) => {
    setColorCustomizer(prev => ({ ...prev, [colorType]: value }));
  };

  const applyColorChanges = async () => {
    const newColors = {
      primary: generateColorPalette(colorCustomizer.primary),
      accent: generateColorPalette(colorCustomizer.accent),
      success: generateColorPalette(colorCustomizer.success),
      error: generateColorPalette(colorCustomizer.error)
    };

    await updateThemeColors(newColors);
  };

  const renderContentManagement = () => (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setContentType('blog')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            contentType === 'blog' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <SafeIcon icon={FiFileText} className="w-4 h-4 inline mr-2" />
          Blog Posts
        </button>
        <button
          onClick={() => setContentType('course')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            contentType === 'course' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <SafeIcon icon={FiBook} className="w-4 h-4 inline mr-2" />
          Courses
        </button>
      </div>

      {/* Create Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
      >
        <SafeIcon icon={FiPlus} className="w-4 h-4" />
        Create {contentType === 'blog' ? 'Blog Post' : 'Course'}
      </button>

      {/* Content List */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(contentType === 'blog' ? posts : courses).map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.excerpt || item.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.is_published ? 'Published' : 'Draft'}
                      </span>
                      {item.is_featured && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <SafeIcon icon={FiEdit} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteContent(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderThemeCustomizer = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Customization</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(colorCustomizer).map(([colorType, value]) => (
            <div key={colorType} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {colorType} Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(colorType, e.target.value)}
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(colorType, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="#000000"
                />
              </div>
              <div 
                className="w-full h-8 rounded-lg border"
                style={{ backgroundColor: value }}
              ></div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={applyColorChanges}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            Apply Changes
          </button>
          <button
            onClick={resetToDefaultColors}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Color Preview */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colorCustomizer.primary }}
            >
              Primary Button
            </button>
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colorCustomizer.accent }}
            >
              Accent Button
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(colorCustomizer).map(([name, color]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-full h-16 rounded-lg mb-2"
                  style={{ backgroundColor: color }}
                ></div>
                <p className="text-sm text-gray-600 capitalize">{name}</p>
                <p className="text-xs text-gray-500">{color}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {editingItem ? 'Edit' : 'Create'} {contentType === 'blog' ? 'Blog Post' : 'Course'}
            </h2>
            <button
              onClick={() => {
                setShowCreateModal(false);
                setEditingItem(null);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={editingItem ? handleUpdateContent : handleCreateContent} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {contentType === 'blog' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {contentType === 'blog' ? 'Content' : 'Description'}
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Published</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowCreateModal(false);
                setEditingItem(null);
                resetForm();
              }}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management System</h1>
        <p className="text-gray-600">Manage your content, customize themes, and configure settings</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex overflow-x-auto gap-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'content' && renderContentManagement()}
        {activeTab === 'theme' && renderThemeCustomizer()}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Settings</h3>
            <p className="text-gray-600">Site settings management coming soon...</p>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      {(showCreateModal || editingItem) && renderModal()}
    </div>
  );
};

export default AdminCMS;