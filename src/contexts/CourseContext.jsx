import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock course data
    const mockCourses = [
      {
        id: '1',
        title: 'Business Fundamentals',
        description: 'Learn the core principles of building a successful business',
        thumbnail: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400',
        duration: '4 weeks',
        level: 'Beginner',
        lessons: [
          {
            id: '1',
            title: 'Introduction to Business',
            type: 'video',
            content: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: '15 min',
            description: 'Overview of business fundamentals and key concepts'
          },
          {
            id: '2',
            title: 'Market Research',
            type: 'text',
            content: 'Understanding your target market is crucial for business success...',
            duration: '10 min',
            description: 'Learn how to conduct effective market research'
          },
          {
            id: '3',
            title: 'Business Planning Audio',
            type: 'audio',
            content: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            duration: '20 min',
            description: 'Audio guide to creating a comprehensive business plan'
          }
        ]
      },
      {
        id: '2',
        title: 'Digital Marketing Mastery',
        description: 'Master digital marketing strategies and tools',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        duration: '6 weeks',
        level: 'Intermediate',
        lessons: [
          {
            id: '1',
            title: 'SEO Fundamentals',
            type: 'video',
            content: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            duration: '25 min',
            description: 'Learn the basics of search engine optimization'
          }
        ]
      }
    ];

    setCourses(mockCourses);
    
    // Mock progress data
    const mockProgress = {
      '1': { completed: ['1'], total: 3, percentage: 33 },
      '2': { completed: [], total: 1, percentage: 0 }
    };
    setProgress(mockProgress);
    setLoading(false);
  }, []);

  const markLessonComplete = (courseId, lessonId) => {
    setProgress(prev => {
      const courseProgress = prev[courseId] || { completed: [], total: 0, percentage: 0 };
      const completed = [...courseProgress.completed];
      
      if (!completed.includes(lessonId)) {
        completed.push(lessonId);
      }
      
      const course = courses.find(c => c.id === courseId);
      const total = course?.lessons?.length || 0;
      const percentage = total > 0 ? Math.round((completed.length / total) * 100) : 0;
      
      return {
        ...prev,
        [courseId]: {
          completed,
          total,
          percentage
        }
      };
    });
  };

  const value = {
    courses,
    progress,
    loading,
    markLessonComplete
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};