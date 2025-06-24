import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useQuestAuth } from '../../contexts/QuestAuthContext';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const { isAuthenticated } = useQuestAuth();
  const location = useLocation();
  
  const hideNavigation = [
    '/', 
    '/login', 
    '/quest-login', 
    '/onboarding'
  ].includes(location.pathname);

  const showNavigation = (user || isAuthenticated) && !hideNavigation;

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <Header />}
      <main className={showNavigation ? 'pb-16' : ''}>
        {children}
      </main>
      {showNavigation && <Navigation />}
    </div>
  );
};

export default Layout;