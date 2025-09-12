import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Volume2, VolumeX, Eye, EyeOff, User, RotateCcw } from 'lucide-react';
import { ProgressData } from '../types';

interface SettingsProps {
  progressData: ProgressData;
  updateSettings: (settings: Partial<ProgressData['settings']>) => void;
  setUserName: (name: string) => void;
  resetProgress: () => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  progressData, 
  updateSettings, 
  setUserName, 
  resetProgress 
}) => {
  const { user, settings } = progressData;

  const toggleTextToSpeech = () => {
    updateSettings({ textToSpeech: !settings.textToSpeech });
    
    if (!settings.textToSpeech && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Text to speech is now enabled');
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleColorblindMode = () => {
    updateSettings({ colorblindMode: !settings.colorblindMode });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Settings & Preferences
          </h1>
          <p className="text-gray-300 text-lg">
            Customize your learning experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Profile */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-blue-400" />
              User Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grade Level
                </label>
                <select
                  value={user.grade}
                  onChange={(e) => {
                    // Note: This would need to be implemented in the main App component
                    console.log('Grade changed to:', e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value={6}>Grade 6</option>
                  <option value={7}>Grade 7</option>
                  <option value={8}>Grade 8</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Accessibility Settings */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <SettingsIcon className="w-6 h-6 mr-3 text-purple-400" />
              Accessibility
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Text-to-Speech</h3>
                  <p className="text-gray-400 text-sm">Hear instructions and content read aloud</p>
                </div>
                <motion.button
                  onClick={toggleTextToSpeech}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    settings.textToSpeech 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {settings.textToSpeech ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </motion.button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Colorblind-Friendly Mode</h3>
                  <p className="text-gray-400 text-sm">Adjust colors for better visibility</p>
                </div>
                <motion.button
                  onClick={toggleColorblindMode}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    settings.colorblindMode 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {settings.colorblindMode ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Progress Stats */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Stats</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-300">{user.totalPoints}</div>
                <div className="text-blue-200 text-sm">Total Points</div>
              </div>
              
              <div className="bg-purple-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-300">{user.level}</div>
                <div className="text-purple-200 text-sm">Current Level</div>
              </div>
              
              <div className="bg-green-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-300">{user.completedActivities.length}</div>
                <div className="text-green-200 text-sm">Activities Done</div>
              </div>
              
              <div className="bg-yellow-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">{user.badges.length}</div>
                <div className="text-yellow-200 text-sm">Badges Earned</div>
              </div>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Data Management</h2>
            
            <div className="space-y-4">
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-2">Reset All Progress</h3>
                <p className="text-red-200 text-sm mb-4">
                  This will permanently delete all your progress, scores, and badges. This action cannot be undone.
                </p>
                
                <motion.button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                      resetProgress();
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset Everything</span>
                </motion.button>
              </div>
              
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Data Storage</h3>
                <p className="text-blue-200 text-sm">
                  Your progress is automatically saved to your device's local storage. No personal information is sent to external servers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* App Information */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">About EduVerse</h2>
          <p className="text-gray-300 mb-4">
            An interactive learning platform designed specifically for middle school students. 
            Combine education with fun through science experiments, coding challenges, logic games, and more!
          </p>
          <div className="text-sm text-gray-400">
            Version 1.0.0 • Built with React & TypeScript • Designed for Grades 6-8
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;