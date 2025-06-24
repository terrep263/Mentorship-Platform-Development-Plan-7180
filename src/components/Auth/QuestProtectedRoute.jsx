import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuestAuth } from '../../contexts/QuestAuthContext';

const QuestProtectedRoute = ({ children, requireOnboarding = true }) => {
  const { isAuthenticated, loading, isOnboardingCompleted } = useQuestAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/quest-login" state={{ from: location }} replace />;
  }

  // Check if onboarding is required and not completed
  if (requireOnboarding && !isOnboardingCompleted() && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default QuestProtectedRoute;