import React from 'react';
import { motion } from 'framer-motion';
import { Home, Beaker, Code, Gamepad2, Brain, FlaskConical, Globe, BarChart3, Settings } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  totalPoints: number;
  level: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView, totalPoints, level }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'science', label: 'Science Lab', icon: Beaker },
    { id: 'coding', label: 'Code Academy', icon: Code },
    { id: 'games', label: 'Logic Games', icon: Gamepad2 },
    { id: 'thinking', label: 'Critical Thinking', icon: Brain },
    { id: 'labs', label: 'Virtual Labs', icon: FlaskConical },
    { id: 'tours', label: 'VR Tours', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              EduVerse
            </h1>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          <motion.div 
            className="flex items-center space-x-4 text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-right">
              <div className="text-sm font-semibold">Level {level}</div>
              <div className="text-xs text-blue-200">{totalPoints} points</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full">
              <span className="text-sm font-bold">⭐</span>
            </div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs">{item.label}</div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;