import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ScienceLab from './components/ScienceLab';
import CodeAcademy from './components/CodeAcademy';
import LogicGames from './components/LogicGames';
import Settings from './components/Settings';
import ParentDashboard from './components/ParentDashboard';
import { useProgress } from './hooks/useProgress';

// Placeholder components for sections not fully implemented yet
const CriticalThinking: React.FC<any> = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 p-6 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Critical Thinking</h1>
      <p className="text-orange-200">Coming soon! Develop problem-solving skills with real-world scenarios.</p>
    </div>
  </div>
);

const VirtualLabs: React.FC<any> = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-green-900 p-6 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Virtual Labs</h1>
      <p className="text-teal-200">Coming soon! Mix chemicals and run simulations safely in our virtual laboratory.</p>
    </div>
  </div>
);

const VRTours: React.FC<any> = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">VR Tours</h1>
      <p className="text-indigo-200">Coming soon! Explore historical sites and natural wonders through immersive virtual tours.</p>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showWelcome, setShowWelcome] = useState(false);
  
  const {
    progressData,
    completeActivity,
    updateProgress,
    resetProgress,
    updateSettings,
    setUserName
  } = useProgress();

  useEffect(() => {
    // Show welcome screen for new users
    if (!progressData.user.name && currentView === 'home') {
      setShowWelcome(true);
    }
  }, [progressData.user.name, currentView]);

  const handleWelcomeComplete = (name: string) => {
    setUserName(name);
    setShowWelcome(false);
  };

  const renderCurrentView = () => {
    const commonProps = {
      completeActivity,
      completedActivities: progressData.user.completedActivities,
      settings: progressData.settings
    };

    switch (currentView) {
      case 'home':
        return (
          <HomePage
            setCurrentView={setCurrentView}
            userName={progressData.user.name}
            totalPoints={progressData.user.totalPoints}
            level={progressData.user.level}
            completedActivities={progressData.user.completedActivities}
          />
        );
      case 'dashboard':
        return <Dashboard user={progressData.user} resetProgress={resetProgress} />;
      case 'science':
        return <ScienceLab {...commonProps} />;
      case 'coding':
        return <CodeAcademy {...commonProps} />;
      case 'games':
        return <LogicGames {...commonProps} />;
      case 'thinking':
        return <CriticalThinking {...commonProps} />;
      case 'labs':
        return <VirtualLabs {...commonProps} />;
      case 'tours':
        return <VRTours {...commonProps} />;
      case 'settings':
        return (
          <Settings
            progressData={progressData}
            updateSettings={updateSettings}
            setUserName={setUserName}
            resetProgress={resetProgress}
          />
        );
      case 'parent':
        return <ParentDashboard progressData={progressData} />;
      default:
        return (
          <HomePage
            setCurrentView={setCurrentView}
            userName={progressData.user.name}
            totalPoints={progressData.user.totalPoints}
            level={progressData.user.level}
            completedActivities={progressData.user.completedActivities}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        totalPoints={progressData.user.totalPoints}
        level={progressData.user.level}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>

      {/* Welcome Modal for New Users */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to EduVerse!</h2>
                <p className="text-blue-200">Let's start your learning journey</p>
              </div>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const name = formData.get('name') as string;
                  if (name.trim()) {
                    handleWelcomeComplete(name.trim());
                  }
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-300 mb-2">
                      What's your name?
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none"
                      placeholder="Enter your name"
                      autoFocus
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Learning!
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parent Dashboard Access Button */}
      <motion.button
        onClick={() => setCurrentView('parent')}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Parent/Teacher Dashboard"
      >
        👨‍👩‍👧‍👦
      </motion.button>
    </div>
  );
}

export default App;