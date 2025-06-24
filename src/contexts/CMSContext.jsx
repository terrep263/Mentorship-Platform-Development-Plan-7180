import React, { createContext, useContext, useState } from 'react';
import supabase from '../lib/supabase';

const CMSContext = createContext();

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export const CMSProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Blog Management
  const createBlogPost = async (postData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts_mz8k4p9x2q')
        .insert([{
          ...postData,
          slug: postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          published_at: postData.is_published ? new Date().toISOString() : null
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateBlogPost = async (id, postData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts_mz8k4p9x2q')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('blog_posts_mz8k4p9x2q')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Course Management
  const createCourse = async (courseData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses_mz8k4p9x2q')
        .insert([{
          ...courseData,
          slug: courseData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id, courseData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses_mz8k4p9x2q')
        .update(courseData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('courses_mz8k4p9x2q')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Lesson Management
  const createLesson = async (lessonData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lessons_mz8k4p9x2q')
        .insert([{
          ...lessonData,
          slug: lessonData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateLesson = async (id, lessonData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lessons_mz8k4p9x2q')
        .update(lessonData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('lessons_mz8k4p9x2q')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Category Management
  const getCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories_mz8k4p9x2q')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories_mz8k4p9x2q')
        .insert([{
          ...categoryData,
          slug: categoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // User Progress Tracking
  const trackPageView = async (pageData) => {
    try {
      const { error } = await supabase
        .from('page_views_mz8k4p9x2q')
        .insert([pageData]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('course_enrollments_mz8k4p9x2q')
        .upsert([{
          user_id: user.id,
          course_id: courseId,
          enrolled_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const markLessonComplete = async (lessonId, courseId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('lesson_progress_mz8k4p9x2q')
        .upsert([{
          user_id: user.id,
          lesson_id: lessonId,
          course_id: courseId,
          completed_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    loading,
    // Blog functions
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    // Course functions
    createCourse,
    updateCourse,
    deleteCourse,
    // Lesson functions
    createLesson,
    updateLesson,
    deleteLesson,
    // Category functions
    getCategories,
    createCategory,
    // Progress tracking
    trackPageView,
    enrollInCourse,
    markLessonComplete
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};