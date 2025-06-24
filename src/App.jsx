import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { CourseProvider } from './contexts/CourseContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Subscription from './pages/Subscription';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_example');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <SubscriptionProvider>
          <CourseProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/courses" 
                    element={
                      <ProtectedRoute>
                        <Courses />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/courses/:courseId" 
                    element={
                      <ProtectedRoute>
                        <CourseDetail />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/courses/:courseId/lessons/:lessonId" 
                    element={
                      <ProtectedRoute>
                        <LessonView />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/blog" 
                    element={
                      <ProtectedRoute>
                        <Blog />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/blog/:postId" 
                    element={
                      <ProtectedRoute>
                        <BlogPost />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/subscription" 
                    element={
                      <ProtectedRoute>
                        <Subscription />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminPanel />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Layout>
            </Router>
          </CourseProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </Elements>
  );
}

export default App;