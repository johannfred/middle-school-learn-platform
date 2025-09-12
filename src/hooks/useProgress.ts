import { useState, useEffect } from 'react';
import { User, Badge, ProgressData } from '../types';

const defaultUser: User = {
  id: '1',
  name: '',
  grade: 6,
  totalPoints: 0,
  level: 1,
  badges: [],
  completedActivities: [],
  progress: {}
};

export const useProgress = () => {
  const [progressData, setProgressData] = useState<ProgressData>(() => {
    const saved = localStorage.getItem('eduplatform_progress');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      user: defaultUser,
      activities: {},
      settings: { textToSpeech: false, colorblindMode: false }
    };
  });

  useEffect(() => {
    localStorage.setItem('eduplatform_progress', JSON.stringify(progressData));
  }, [progressData]);

  const completeActivity = (activityId: string, points: number) => {
    setProgressData(prev => {
      const newUser = { ...prev.user };
      if (!newUser.completedActivities.includes(activityId)) {
        newUser.completedActivities.push(activityId);
        newUser.totalPoints += points;
        newUser.level = Math.floor(newUser.totalPoints / 100) + 1;
        
        // Award badges based on milestones
        const newBadges = [];
        if (newUser.totalPoints >= 100 && !newUser.badges.find(b => b.id === 'first-hundred')) {
          newBadges.push({
            id: 'first-hundred',
            name: 'First Century',
            description: 'Earned your first 100 points!',
            icon: '🌟',
            earnedAt: new Date()
          });
        }
        if (newUser.completedActivities.length >= 5 && !newUser.badges.find(b => b.id === 'five-complete')) {
          newBadges.push({
            id: 'five-complete',
            name: 'Learning Streak',
            description: 'Completed 5 activities!',
            icon: '🔥',
            earnedAt: new Date()
          });
        }
        newUser.badges = [...newUser.badges, ...newBadges];
      }
      
      return {
        ...prev,
        user: newUser
      };
    });
  };

  const updateProgress = (category: string, progress: number) => {
    setProgressData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        progress: {
          ...prev.user.progress,
          [category]: progress
        }
      }
    }));
  };

  const resetProgress = () => {
    setProgressData({
      user: { ...defaultUser, name: progressData.user.name },
      activities: {},
      settings: progressData.settings
    });
  };

  const updateSettings = (settings: Partial<typeof progressData.settings>) => {
    setProgressData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  const setUserName = (name: string) => {
    setProgressData(prev => ({
      ...prev,
      user: { ...prev.user, name }
    }));
  };

  return {
    progressData,
    completeActivity,
    updateProgress,
    resetProgress,
    updateSettings,
    setUserName
  };
};