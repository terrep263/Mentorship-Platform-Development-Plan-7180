import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    getInitialSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // Get user profile with role
          await getUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getInitialSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      setSession(session);
      if (session?.user) {
        await getUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('Error getting session:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles_mz8k4p9x2q')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // User profile doesn't exist, create one with default role
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await createUserProfile(user);
        }
        return;
      }

      if (error) throw error;

      setUser({
        id: data.id,
        email: data.email,
        name: data.full_name,
        role: data.role,
        avatar: data.avatar_url,
        emailVerified: data.email_verified,
        createdAt: data.created_at
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const createUserProfile = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles_mz8k4p9x2q')
        .insert([
          {
            id: authUser.id,
            email: authUser.email,
            full_name: authUser.user_metadata?.full_name || authUser.email.split('@')[0],
            role: 'mentee', // Default role
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.user_metadata?.full_name || authUser.email.split('@')[0])}&background=0ea5e9&color=fff`,
            email_verified: authUser.email_confirmed_at ? true : false,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setUser({
        id: data.id,
        email: data.email,
        name: data.full_name,
        role: data.role,
        avatar: data.avatar_url,
        emailVerified: data.email_verified,
        createdAt: data.created_at
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const signUp = async (email, password, fullName) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          },
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });

      if (error) throw error;

      return { 
        success: true, 
        message: 'Please check your email for verification link',
        needsVerification: !data.user?.email_confirmed_at
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Check if email is verified
      if (!data.user?.email_confirmed_at) {
        return { 
          success: false, 
          error: 'Please verify your email before signing in. Check your inbox for verification link.' 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  };

  const resendVerification = async (email) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });

      if (error) throw error;
      return { success: true, message: 'Verification email sent' };
    } catch (error) {
      console.error('Resend verification error:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user?.id) throw new Error('No user logged in');

      const { error } = await supabase
        .from('user_profiles_mz8k4p9x2q')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Update local user state
      setUser(prev => ({ ...prev, ...updates }));
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  };

  // Admin functions
  const updateUserRole = async (userId, newRole) => {
    try {
      if (user?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      const { error } = await supabase
        .from('user_profiles_mz8k4p9x2q')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Update user role error:', error);
      return { success: false, error: error.message };
    }
  };

  const getAllUsers = async () => {
    try {
      if (user?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      const { data, error } = await supabase
        .from('user_profiles_mz8k4p9x2q')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get all users error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resendVerification,
    resetPassword,
    updatePassword,
    updateProfile,
    updateUserRole,
    getAllUsers,
    // Backward compatibility
    login: signIn,
    register: signUp,
    logout: signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};