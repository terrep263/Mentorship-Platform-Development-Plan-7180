import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeQuery = async (queryFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeQuery };
};

// Custom hooks for different data types
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses_mz8k4p9x2q')
        .select(`
          *,
          category:categories_mz8k4p9x2q(name, color),
          lessons:lessons_mz8k4p9x2q(id, title, duration, lesson_type)
        `)
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, refetch: fetchCourses };
};

export const useBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts_mz8k4p9x2q')
        .select(`
          *,
          author:profiles_mz8k4p9x2q(full_name, avatar_url),
          category:categories_mz8k4p9x2q(name, color)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, refetch: fetchPosts };
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings_mz8k4p9x2q')
        .select('*');

      if (error) throw error;
      
      const settingsMap = {};
      data?.forEach(setting => {
        settingsMap[setting.setting_key] = setting.setting_value;
      });
      
      setSettings(settingsMap);
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key, value) => {
    try {
      const { error } = await supabase
        .from('site_settings_mz8k4p9x2q')
        .upsert({ 
          setting_key: key, 
          setting_value: value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      setSettings(prev => ({ ...prev, [key]: value }));
      return true;
    } catch (err) {
      console.error('Error updating setting:', err);
      return false;
    }
  };

  return { settings, loading, updateSetting, refetch: fetchSettings };
};