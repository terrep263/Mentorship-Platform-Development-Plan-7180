import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Mock authentication - replace with real auth service
  useEffect(() => {
    const storedUser = localStorage.getItem('mentorship_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - replace with real authentication
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : email.includes('mentor') ? 'mentor' : 'mentee',
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0ea5e9&color=fff`
      };
      
      localStorage.setItem('mentorship_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      // Mock registration - replace with real authentication
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        role: 'mentee',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=0ea5e9&color=fff`
      };
      
      localStorage.setItem('mentorship_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('mentorship_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};