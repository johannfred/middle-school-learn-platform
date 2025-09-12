import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Trophy, Target, Calendar, TrendingUp, Award, User, Clock } from 'lucide-react';
import { ProgressData } from '../types';

interface ParentDashboardProps {
  progressData: ProgressData;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ progressData }) => {
  const { user } = progressData;

  const getActivityCountByCategory = (category: string) => {
    return user.completedActivities.filter(id => id.startsWith(category)).length;
  };

  const getTotalActivities = () => {
    // This would be based on the actual number of activities available in each category
    return 15; // Approximate total activities across all categories
  };

  const getCompletionPercentage = () => {
    return Math.round((user.completedActivities.length / getTotalActivities()) * 100);
  };

  const getRecentBadges = () => {
    return user.badges.slice(-3); // Show last 3 badges earned
  };

  const categoryData = [
    { name: 'Science Lab', completed: getActivityCountByCategory('science'), total: 3, color: 'green' },
    { name: 'Code Academy', completed: getActivityCountByCategory('coding'), total: 3, color: 'blue' },
    { name: 'Logic Games', completed: getActivityCountByCategory('games'), total: 3, color: 'purple' },
    { name: 'Critical Thinking', completed: getActivityCountByCategory('thinking'), total: 2, color: 'orange' },
    { name: 'Virtual Labs', completed: getActivityCountByCategory('labs'), total: 2, color: 'teal' },
    { name: 'VR Tours', completed: getActivityCountByCategory('tours'), total: 2, color: 'indigo' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-500 to-emerald-600',
      blue: 'from-blue-500 to-cyan-600',
      purple: 'from-purple-500 to-pink-600',
      orange: 'from-orange-500 to-red-600',
      teal: 'from-teal-500 to-green-600',
      indigo: 'from-indigo-500 to-purple-600'
    };
    return colors[color as keyof typeof colors] || 'from-gray-500 to-gray-600';
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
            Parent & Teacher Dashboard
          </h1>
          <p className="text-blue-200 text-lg">
            Monitor learning progress and achievements
          </p>
        </motion.div>

        {/* Student Overview */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-400" />
            Student Profile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <User className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <div className="text-lg font-semibold">{user.name || 'Student'}</div>
                <div className="text-blue-200 text-sm">Grade {user.grade}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{user.totalPoints}</div>
                <div className="text-purple-200 text-sm">Total Points</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{user.level}</div>
                <div className="text-green-200 text-sm">Current Level</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-6 text-white">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{user.badges.length}</div>
                <div className="text-orange-200 text-sm">Badges Earned</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress by Subject */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-green-400" />
              Subject Progress
            </h2>
            
            <div className="space-y-4">
              {categoryData.map((category, index) => {
                const percentage = category.total > 0 ? (category.completed / category.total) * 100 : 0;
                
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{category.name}</span>
                      <span className="text-gray-300 text-sm">
                        {category.completed}/{category.total} completed
                      </span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${getColorClasses(category.color)} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {Math.round(percentage)}% complete
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Overall Progress */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {getCompletionPercentage()}%
                </div>
                <div className="text-gray-300">Overall Completion</div>
                <div className="bg-gray-700 rounded-full h-4 mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getCompletionPercentage()}%` }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-yellow-400" />
              Recent Achievements
            </h2>
            
            {user.badges.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p>No badges earned yet</p>
                <p className="text-sm">Complete activities to earn achievements!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getRecentBadges().map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 flex items-center space-x-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{badge.name}</h3>
                      <p className="text-yellow-200 text-sm">{badge.description}</p>
                      <p className="text-yellow-300 text-xs">
                        Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {user.badges.length > 3 && (
                  <div className="text-center text-gray-400 text-sm">
                    And {user.badges.length - 3} more badges...
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Learning Insights */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-blue-400" />
            Learning Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-xl p-6">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">Study Streak</h3>
                <p className="text-blue-200">
                  {user.completedActivities.length > 0 ? 'Active learner!' : 'Ready to start learning'}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500/20 rounded-xl p-6">
                <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">Strongest Subject</h3>
                <p className="text-green-200">
                  {categoryData.reduce((max, cat) => cat.completed > max.completed ? cat : max).name}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-xl p-6">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-2">Next Milestone</h3>
                <p className="text-purple-200">
                  {100 - (user.totalPoints % 100)} points to level {user.level + 1}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recommendations for Continued Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Areas to Focus On</h3>
              <ul className="text-purple-100 space-y-1">
                {categoryData
                  .filter(cat => cat.completed < cat.total)
                  .slice(0, 3)
                  .map(cat => (
                    <li key={cat.name}>• Complete more {cat.name} activities</li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Strengths to Build On</h3>
              <ul className="text-blue-100 space-y-1">
                {categoryData
                  .filter(cat => cat.completed > 0)
                  .slice(0, 3)
                  .map(cat => (
                    <li key={cat.name}>• Excellent progress in {cat.name}</li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentDashboard;