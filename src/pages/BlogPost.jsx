import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiUser, FiClock, FiTag, FiShare2 } = FiIcons;

const BlogPost = () => {
  const { postId } = useParams();

  // Mock blog post data - in real app, this would come from API
  const post = {
    id: postId,
    title: 'Building Resilience in Business',
    content: `
      <p>Building resilience in business is more crucial than ever in today's rapidly changing marketplace. Resilience isn't just about surviving challenges—it's about thriving despite them and emerging stronger on the other side.</p>

      <h2>What is Business Resilience?</h2>
      <p>Business resilience refers to an organization's ability to adapt and respond to disruptions while maintaining continuous business operations and safeguarding people, assets, and overall brand equity.</p>

      <h2>Key Components of Resilient Businesses</h2>
      <ul>
        <li><strong>Adaptive Leadership:</strong> Leaders who can pivot quickly and make decisions under pressure</li>
        <li><strong>Financial Flexibility:</strong> Diverse revenue streams and strong cash flow management</li>
        <li><strong>Operational Agility:</strong> Systems and processes that can be quickly modified</li>
        <li><strong>Strong Team Culture:</strong> Employees who are engaged and committed to the company's mission</li>
      </ul>

      <h2>Building Your Resilience Strategy</h2>
      <p>Start by conducting a thorough risk assessment of your business. Identify potential vulnerabilities and create contingency plans for various scenarios. This proactive approach will serve you well when unexpected challenges arise.</p>

      <blockquote>
        "The bamboo that bends is stronger than the oak that resists." - Japanese Proverb
      </blockquote>

      <p>Remember, resilience is not built overnight. It's a continuous process of learning, adapting, and growing. Every challenge you overcome makes your business stronger and more prepared for future obstacles.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['business', 'mindset', 'strategy'],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    embeddedTools: [
      {
        name: 'Business Resilience Assessment',
        description: 'Evaluate your business resilience with our interactive tool',
        url: 'https://example.com/resilience-assessment'
      }
    ]
  };

  if (!post) {
    return (
      <div className="px-4 py-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
        <Link to="/blog" className="text-primary-600 hover:text-primary-700">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link 
          to="/blog"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          Back to Blog
        </Link>
      </motion.div>

      {/* Article Header */}
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-6"
      >
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        
        <div className="p-6 md:p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                <SafeIcon icon={FiTag} className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          {/* Meta Info */}
          <div className="flex items-center gap-6 text-gray-600 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiUser} className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiClock} className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <button className="ml-auto flex items-center gap-2 text-primary-600 hover:text-primary-700">
              <SafeIcon icon={FiShare2} className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </motion.article>

      {/* Embedded Tools */}
      {post.embeddedTools && post.embeddedTools.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border p-6 mb-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Tools</h3>
          <div className="space-y-4">
            {post.embeddedTools.map((tool, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h4 className="font-semibold text-gray-900 mb-1">{tool.name}</h4>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
                <div className="h-96">
                  <iframe 
                    src={tool.url}
                    className="w-full h-full"
                    frameBorder="0"
                    title={tool.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related Posts */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              id: '2',
              title: 'The Power of Networking',
              excerpt: 'Discover effective networking strategies...',
              image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300'
            },
            {
              id: '4',
              title: 'Leadership in Remote Teams',
              excerpt: 'Master the art of leading distributed teams...',
              image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300'
            }
          ].map((relatedPost) => (
            <Link
              key={relatedPost.id}
              to={`/blog/${relatedPost.id}`}
              className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
            >
              <img 
                src={relatedPost.image} 
                alt={relatedPost.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{relatedPost.title}</h4>
                <p className="text-sm text-gray-600">{relatedPost.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPost;