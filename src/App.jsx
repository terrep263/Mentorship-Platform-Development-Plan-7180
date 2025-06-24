import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { AuthProvider } from './contexts/AuthContext';
import { QuestAuthProvider } from './contexts/QuestAuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { CourseProvider } from './contexts/CourseContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CMSProvider } from './contexts/CMSContext';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Layouts
import Layout from './components/Layout/Layout';
import AdminLayout from './components/Admin/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import QuestLoginPage from './pages/QuestLogin';
import QuestOnboardingPage from './pages/QuestOnboarding';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Protected Pages
import GetStartedPage from './pages/GetStartedPage';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Subscription from './pages/Subscription';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminPosts from './pages/Admin/Posts/AdminPosts';
import AdminPostEditor from './pages/Admin/Posts/AdminPostEditor';
import AdminCourses from './pages/Admin/Courses/AdminCourses';
import AdminUsers from './pages/Admin/Users/AdminUsers';
import AdminUserEditor from './pages/Admin/Users/AdminUserEditor';
import AdminAnalytics from './pages/Admin/Analytics/AdminAnalytics';
import AdminTheme from './pages/Admin/Appearance/AdminTheme';
import AdminSettings from './pages/Admin/Settings/AdminSettings';

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute';
import QuestProtectedRoute from './components/Auth/QuestProtectedRoute';
import questConfig from './config/questConfig';

// Initialize Stripe 
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_example');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <QuestProvider
        apiKey={questConfig.APIKEY}
        entityId={questConfig.ENTITYID}
        apiType="PRODUCTION"
      >
        <AuthProvider>
          <QuestAuthProvider>
            <ThemeProvider>
              <CMSProvider>
                <SubscriptionProvider>
                  <CourseProvider>
                    <Router>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/login" element={<Layout><Login /></Layout>} />
                        <Route path="/quest-login" element={<Layout><QuestLoginPage /></Layout>} />
                        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
                        <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
                        <Route path="/verify-email" element={<Layout><EmailVerification /></Layout>} />
                        
                        <Route path="/onboarding" element={<Layout>
                          <QuestProtectedRoute requireOnboarding={false}>
                            <QuestOnboardingPage />
                          </QuestProtectedRoute>
                        </Layout>} />

                        {/* Protected User Routes */}
                        <Route path="/dashboard" element={<Layout>
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        </Layout>} />
                        
                        <Route path="/get-started" element={<Layout>
                          <ProtectedRoute>
                            <GetStartedPage />
                          </ProtectedRoute>
                        </Layout>} />
                        
                        <Route path="/courses" element={<Layout>
                          <ProtectedRoute>
                            <Courses />
                          </ProtectedRoute>
                        </Layout>} />
                        
                        <Route path="/courses/:courseId" element={<Layout>
                          <ProtectedRoute>
                            <CourseDetail />
                          </ProtectedRoute>
                        </Layout>} />
                        
                        <Route path="/courses/:courseId/lessons/:lessonId" element={<Layout>
                          <ProtectedRoute>
                            <LessonView />
                          </ProtectedRoute>
                        </Layout>} />
                        
                        <Route path="/blog" element={<Layout>
                          <ProtectedRoute>
                            <Blog />
                          </ProtectedRoute>
                        </Layout>} />
                        
                        <Route path="/blog/:postId" element={<Layout>
                          <ProtectedRoute>
                            <BlogPost />
                          </ProtectedRoute>
                        </Layout>} />
                        
                        <Route path="/subscription" element={<Layout>
                          <ProtectedRoute>
                            <Subscription />
                          </ProtectedRoute>
                        </Layout>} />

                        {/* Admin Routes - All under /admin with AdminLayout */}
                        <Route path="/admin" element={
                          <ProtectedRoute adminOnly>
                            <AdminLayout />
                          </ProtectedRoute>
                        }>
                          {/* Admin Dashboard */}
                          <Route index element={<AdminDashboard />} />
                          
                          {/* Content Management */}
                          <Route path="posts" element={<AdminPosts />} />
                          <Route path="posts/new" element={<AdminPostEditor />} />
                          <Route path="posts/edit/:id" element={<AdminPostEditor />} />
                          <Route path="categories" element={<div>Categories Management</div>} />
                          <Route path="blog-settings" element={<div>Blog Settings</div>} />
                          
                          {/* Course Management */}
                          <Route path="courses" element={<AdminCourses />} />
                          <Route path="courses/new" element={<div>Add New Course</div>} />
                          <Route path="courses/edit/:id" element={<div>Edit Course</div>} />
                          <Route path="lessons" element={<div>All Lessons</div>} />
                          <Route path="course-settings" element={<div>Course Settings</div>} />
                          
                          {/* User Management */}
                          <Route path="users" element={<AdminUsers />} />
                          <Route path="users/new" element={<AdminUserEditor />} />
                          <Route path="users/edit/:id" element={<AdminUserEditor />} />
                          <Route path="user-roles" element={<div>User Roles</div>} />
                          <Route path="user-analytics" element={<div>User Analytics</div>} />
                          
                          {/* Subscriptions */}
                          <Route path="subscriptions" element={<div>All Subscriptions</div>} />
                          <Route path="subscription-plans" element={<div>Plans & Pricing</div>} />
                          <Route path="payments" element={<div>Payment History</div>} />
                          <Route path="revenue" element={<div>Revenue Analytics</div>} />
                          
                          {/* Analytics */}
                          <Route path="analytics" element={<AdminAnalytics />} />
                          <Route path="analytics/content" element={<div>Content Performance</div>} />
                          <Route path="analytics/engagement" element={<div>User Engagement</div>} />
                          <Route path="analytics/courses" element={<div>Course Progress</div>} />
                          
                          {/* Appearance */}
                          <Route path="theme" element={<AdminTheme />} />
                          <Route path="menus" element={<div>Menus</div>} />
                          <Route path="widgets" element={<div>Widgets</div>} />
                          
                          {/* Tools */}
                          <Route path="import-export" element={<div>Import/Export</div>} />
                          <Route path="site-health" element={<div>Site Health</div>} />
                          <Route path="email" element={<div>Email Settings</div>} />
                          
                          {/* Settings */}
                          <Route path="settings" element={<AdminSettings />} />
                          <Route path="settings/general" element={<AdminSettings />} />
                          <Route path="settings/security" element={<div>Security Settings</div>} />
                          <Route path="settings/performance" element={<div>Performance Settings</div>} />
                          <Route path="settings/integrations" element={<div>Integration Settings</div>} />
                        </Route>
                      </Routes>
                    </Router>
                  </CourseProvider>
                </SubscriptionProvider>
              </CMSProvider>
            </ThemeProvider>
          </QuestAuthProvider>
        </AuthProvider>
      </QuestProvider>
    </Elements>
  );
}

export default App;