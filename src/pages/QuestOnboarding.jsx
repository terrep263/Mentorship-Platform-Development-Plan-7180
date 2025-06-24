import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiTrendingUp, FiAward, FiCheck, FiChevronRight, FiChevronLeft, FiUsers } = FiIcons;

const QuestOnboardingPage = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useQuestAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    goals: [],
    experience: '',
    interests: [],
    learningStyle: ''
  });

  const userId = localStorage.getItem('quest_userId');
  const token = localStorage.getItem('quest_token');

  // Redirect if no auth data
  if (!userId || !token) {
    navigate('/quest-login', { replace: true });
    return null;
  }

  const steps = [
    {
      id: 'goals',
      title: 'What are your main goals?',
      subtitle: 'Select all that apply',
      type: 'multi-choice',
      options: [
        { id: 'career', label: 'Advance my career', icon: FiTrendingUp },
        { id: 'skills', label: 'Learn new skills', icon: FiTarget },
        { id: 'business', label: 'Start a business', icon: FiAward },
        { id: 'leadership', label: 'Improve leadership', icon: FiUsers },
        { id: 'networking', label: 'Expand network', icon: FiUsers },
        { id: 'personal', label: 'Personal growth', icon: FiTarget }
      ]
    },
    {
      id: 'experience',
      title: 'What\'s your experience level?',
      subtitle: 'Choose the option that best describes you',
      type: 'single-choice',
      options: [
        { id: 'beginner', label: 'Beginner - Just starting out' },
        { id: 'intermediate', label: 'Intermediate - Some experience' },
        { id: 'advanced', label: 'Advanced - Experienced professional' },
        { id: 'expert', label: 'Expert - Industry veteran' }
      ]
    },
    {
      id: 'interests',
      title: 'Which topics interest you most?',
      subtitle: 'Select your areas of interest',
      type: 'multi-choice',
      options: [
        { id: 'business', label: 'Business Strategy' },
        { id: 'marketing', label: 'Digital Marketing' },
        { id: 'leadership', label: 'Leadership' },
        { id: 'finance', label: 'Finance & Investment' },
        { id: 'technology', label: 'Technology' },
        { id: 'sales', label: 'Sales' }
      ]
    },
    {
      id: 'learningStyle',
      title: 'How do you prefer to learn?',
      subtitle: 'Choose your preferred learning method',
      type: 'single-choice',
      options: [
        { id: 'video', label: 'Video content' },
        { id: 'text', label: 'Reading articles' },
        { id: 'audio', label: 'Audio/Podcasts' },
        { id: 'interactive', label: 'Interactive exercises' }
      ]
    }
  ];

  const currentStepData = steps[currentStep];

  const handleAnswer = (optionId) => {
    const stepId = currentStepData.id;
    
    if (currentStepData.type === 'multi-choice') {
      setAnswers(prev => ({
        ...prev,
        [stepId]: prev[stepId].includes(optionId)
          ? prev[stepId].filter(id => id !== optionId)
          : [...prev[stepId], optionId]
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [stepId]: optionId
      }));
    }
  };

  const isAnswered = () => {
    const stepId = currentStepData.id;
    if (currentStepData.type === 'multi-choice') {
      return answers[stepId].length > 0;
    }
    return answers[stepId] !== '';
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      completeOnboarding();
      navigate('/dashboard', { replace: true });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-500 to-accent-600 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-28 h-28 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-32 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 left-16 w-12 h-12 bg-white rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Get You
            <span className="block text-accent-200">Set Up!</span>
          </h1>
          <p className="text-xl text-accent-100 mb-8 leading-relaxed">
            We're personalizing your learning experience based on your goals, 
            interests, and preferred learning style. This will only take a few minutes.
          </p>

          {/* Progress Indicator */}
          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 text-white mb-2">
              <SafeIcon icon={FiCheck} className="w-5 h-5" />
              <span className="text-sm">Account created successfully</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-accent-200 mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Onboarding Questions */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Get Started!</h1>
            <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
            <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center">
              <h2 className="text-xl font-bold mb-1">{currentStepData.title}</h2>
              <p className="text-primary-100 text-sm">{currentStepData.subtitle}</p>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {currentStepData.options.map((option) => {
                  const isSelected = currentStepData.type === 'multi-choice'
                    ? answers[currentStepData.id].includes(option.id)
                    : answers[currentStepData.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 text-primary-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {option.icon && (
                          <SafeIcon 
                            icon={option.icon} 
                            className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} 
                          />
                        )}
                        <span className="font-medium">{option.label}</span>
                        {isSelected && (
                          <SafeIcon icon={FiCheck} className="w-5 h-5 text-primary-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SafeIcon icon={FiChevronLeft} className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isAnswered()}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                  <SafeIcon icon={FiChevronRight} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="mt-6 lg:hidden">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {currentStep + 1} of {steps.length} completed
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestOnboardingPage;