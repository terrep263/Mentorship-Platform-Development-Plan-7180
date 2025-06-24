import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiUser, FiTag, FiSearch } = FiIcons;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Mock blog posts
  const posts = [
    {
      id: '1',
      title: 'Building Resilience in Business',
      excerpt: 'Learn how to bounce back from setbacks and build a stronger business foundation that can weather any storm.',
      content: 'Full content here...',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['business', 'mindset'],
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600',
      featured: true
    },
    {
      id: '2',
      title: 'The Power of Networking',
      excerpt: 'Discover effective networking strategies that can accelerate your career growth and open new opportunities.',
      content: 'Full content here...',
      author: 'Mike Chen',
      date: '2024-01-14',
      readTime: '7 min read',
      tags: ['networking', 'career'],
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600',
      featured: false
    },
    {
      id: '3',
      title: 'Digital Marketing Trends 2024',
      excerpt: 'Stay ahead of the curve with the latest digital marketing trends and strategies for the new year.',
      content: 'Full content here...',
      author: 'Emily Rodriguez',
      date: '2024-01-13',
      readTime: '6 min read',
      tags: ['marketing', 'digital'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      featured: false
    },
    {
      id: '4',
      title: 'Leadership in Remote Teams',
      excerpt: 'Master the art of leading distributed teams and building strong remote work culture.',
      content: 'Full content here...',
      author: 'David Kim',
      date: '2024-01-12',
      readTime: '8 min read',
      tags: ['leadership', 'remote'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
      featured: false
    }
  ];

  const tags = ['all', 'business', 'mindset', 'networking', 'career', 'marketing', 'digital', 'leadership', 'remote'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Insights</h1>
        <p className="text-gray-600">Expert advice, tips, and insights to accelerate your growth</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag === 'all' ? 'All Topics' : tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Post */}
      {featuredPost && selectedTag === 'all' && !searchTerm && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Link
            to={`/blog/${featuredPost.id}`}
            className="block bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-4 text-lg">{featuredPost.excerpt}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Regular Posts */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {regularPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/blog/${post.id}`}
              className="block bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow h-full"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      <SafeIcon icon={FiTag} className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiSearch} className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for</p>
        </motion.div>
      )}
    </div>
  );
};

export default Blog;