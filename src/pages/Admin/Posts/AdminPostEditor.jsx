import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCMS } from '../../../contexts/CMSContext';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiArrowLeft, FiEye, FiImage, FiTag, FiCalendar } = FiIcons;

const AdminPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createBlogPost, updateBlogPost, loading } = useCMS();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    tags: [],
    is_published: false,
    is_featured: false
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = isEditing 
        ? await updateBlogPost(id, formData)
        : await createBlogPost(formData);
      
      if (result.success) {
        navigate('/admin/posts');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/posts"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            Back to Posts
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'Add New Post'}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {formData.title && (
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              <SafeIcon icon={FiEye} className="w-4 h-4" />
              Preview
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Write your post content..."
              required
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of your post..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {isEditing ? 'Last modified' : 'Draft created'}: {new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Published</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                {loading ? 'Saving...' : (isEditing ? 'Update' : 'Publish')}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiImage} className="w-5 h-5" />
              Featured Image
            </h3>
            
            <div className="space-y-4">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Image URL..."
              />
              
              {formData.image && (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiTag} className="w-5 h-5" />
              Tags
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Add tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminPostEditor;