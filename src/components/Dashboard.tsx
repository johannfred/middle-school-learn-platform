import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Calendar, TrendingUp, Award, RefreshCw } from 'lucide-react';
import { User, Badge } from '../types';

interface DashboardProps {
  user: User;
  resetProgress: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, resetProgress }) => {
  const progressCategories = [
    { key: 'science', label: 'Science Lab', color: 'from-green-500 to-emerald-600' },
    { key: 'coding', label: 'Code Academy', color: 'from-blue-500 to-cyan-600' },
    { key: 'games', label: 'Logic Games', color: 'from-purple-500 to-pink-600' },
    { key: 'thinking', label: 'Critical Thinking', color: 'from-orange-500 to-red-600' },
    { key: 'labs', label: 'Virtual Labs', color: 'from-teal-500 to-green-600' },
    { key: 'tours', label: 'VR Tours', color: 'from-indigo-500 to-purple-600' }
  ];

  const getProgressPercentage = (category: string) => {
    return user.progress[category] || 0;
  };

  const getLevelProgress = () => {
    const currentLevelPoints = user.totalPoints % 100;
    return currentLevelPoints;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Learning Dashboard
          </h1>
          <p className="text-blue-200 text-lg">
            Track your progress and celebrate your achievements!
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Trophy className="w-12 h-12 mb-4 text-yellow-400" />
            <div className="text-3xl font-bold">{user.totalPoints}</div>
            <div className="text-blue-200">Total Points</div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-12 h-12 mb-4 text-yellow-400" />
            <div className="text-3xl font-bold">{user.level}</div>
            <div className="text-purple-200">Current Level</div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Target className="w-12 h-12 mb-4 text-yellow-400" />
            <div className="text-3xl font-bold">{user.completedActivities.length}</div>
            <div className="text-green-200">Activities Done</div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-6 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Award className="w-12 h-12 mb-4 text-yellow-400" />
            <div className="text-3xl font-bold">{user.badges.length}</div>
            <div className="text-orange-200">Badges Earned</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress by Category */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
              Subject Progress
            </h2>
            
            <div className="space-y-4">
              {progressCategories.map((category, index) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex justify-between text-white mb-2">
                    <span>{category.label}</span>
                    <span>{getProgressPercentage(category.key)}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage(category.key)}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Level Progress */}
            <div className="mt-8">
              <div className="flex justify-between text-white mb-2">
                <span>Level {user.level} Progress</span>
                <span>{getLevelProgress()}/100</span>
              </div>
              <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getLevelProgress()}%` }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-yellow-400" />
              Achievement Badges
            </h2>
            
            {user.badges.length === 0 ? (
              <div className="text-center text-blue-200 py-8">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p>Complete activities to earn your first badge!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {user.badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="text-white font-semibold text-sm">{badge.name}</div>
                    <div className="text-yellow-200 text-xs">{badge.description}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Reset Progress */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                resetProgress();
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset Progress</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;