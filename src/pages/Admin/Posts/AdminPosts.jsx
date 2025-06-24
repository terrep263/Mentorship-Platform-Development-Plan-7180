import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogPosts } from '../../../hooks/useSupabase';
import { useCMS } from '../../../contexts/CMSContext';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter, FiCalendar } = FiIcons;

const AdminPosts = () => {
  const { posts, loading, refetch } = useBlogPosts();
  const { deleteBlogPost } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && post.is_published) ||
                         (filterStatus === 'draft' && !post.is_published);
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const result = await deleteBlogPost(id);
      if (result.success) {
        refetch();
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog content</p>
        </div>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          Add New Post
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900 hover:text-primary-600">
                          <Link to={`/admin/posts/edit/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {post.excerpt}
                        </p>
                        {post.is_featured && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.is_published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/blog/${post.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Post"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Edit Post"
                      >
                        <SafeIcon icon={FiEdit} className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Post"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first blog post'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/admin/posts/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                Create Your First Post
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;