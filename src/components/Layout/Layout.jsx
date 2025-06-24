import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  const hideNavigation = ['/login', '/'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {user && !hideNavigation && <Header />}
      <main className={user && !hideNavigation ? 'pb-16' : ''}>
        {children}
      </main>
      {user && !hideNavigation && <Navigation />}
    </div>
  );
};

export default Layout;