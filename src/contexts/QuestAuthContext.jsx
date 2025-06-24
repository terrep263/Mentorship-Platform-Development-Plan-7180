import React, { createContext, useContext, useState, useEffect } from 'react';

const QuestAuthContext = createContext();

export const useQuestAuth = () => {
  const context = useContext(QuestAuthContext);
  if (!context) {
    throw new Error('useQuestAuth must be used within a QuestAuthProvider');
  }
  return context;
};

export const QuestAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication
    const storedUserId = localStorage.getItem('quest_userId');
    const storedToken = localStorage.getItem('quest_token');
    const storedUser = localStorage.getItem('quest_user');

    if (storedUserId && storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const { userId, token, newUser, ...userInfo } = userData;
    
    localStorage.setItem('quest_userId', userId);
    localStorage.setItem('quest_token', token);
    localStorage.setItem('quest_user', JSON.stringify(userInfo));
    
    setUser(userInfo);
    setIsAuthenticated(true);
    
    return { userId, token, newUser };
  };

  const logout = () => {
    localStorage.removeItem('quest_userId');
    localStorage.removeItem('quest_token');
    localStorage.removeItem('quest_user');
    localStorage.removeItem('quest_onboarding_completed');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const completeOnboarding = () => {
    localStorage.setItem('quest_onboarding_completed', 'true');
  };

  const isOnboardingCompleted = () => {
    return localStorage.getItem('quest_onboarding_completed') === 'true';
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    completeOnboarding,
    isOnboardingCompleted
  };

  return (
    <QuestAuthContext.Provider value={value}>
      {children}
    </QuestAuthContext.Provider>
  );
};