import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Code, Gamepad2, Brain, FlaskConical, Globe, Sparkles, Trophy, Target } from 'lucide-react';

interface HomePageProps {
  setCurrentView: (view: string) => void;
  userName: string;
  totalPoints: number;
  level: number;
  completedActivities: string[];
}

const HomePage: React.FC<HomePageProps> = ({ 
  setCurrentView, 
  userName, 
  totalPoints, 
  level, 
  completedActivities 
}) => {
  const features = [
    {
      id: 'science',
      title: 'Science Experiments',
      description: 'Conduct virtual experiments with step-by-step guidance',
      icon: Beaker,
      color: 'from-green-500 to-emerald-600',
      completed: completedActivities.filter(id => id.startsWith('science')).length
    },
    {
      id: 'coding',
      title: 'Code Academy',
      description: 'Learn programming with interactive lessons and challenges',
      icon: Code,
      color: 'from-blue-500 to-cyan-600',
      completed: completedActivities.filter(id => id.startsWith('coding')).length
    },
    {
      id: 'games',
      title: 'Logic Games',
      description: 'Solve puzzles and brain teasers to boost your thinking',
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-600',
      completed: completedActivities.filter(id => id.startsWith('games')).length
    },
    {
      id: 'thinking',
      title: 'Critical Thinking',
      description: 'Develop problem-solving skills with real scenarios',
      icon: Brain,
      color: 'from-orange-500 to-red-600',
      completed: completedActivities.filter(id => id.startsWith('thinking')).length
    },
    {
      id: 'labs',
      title: 'Virtual Labs',
      description: 'Mix chemicals and run simulations safely',
      icon: FlaskConical,
      color: 'from-teal-500 to-green-600',
      completed: completedActivities.filter(id => id.startsWith('labs')).length
    },
    {
      id: 'tours',
      title: 'VR Tours',
      description: 'Explore historical sites and natural wonders',
      icon: Globe,
      color: 'from-indigo-500 to-purple-600',
      completed: completedActivities.filter(id => id.startsWith('tours')).length
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full text-white font-semibold mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Welcome to the Future of Learning!</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              {userName ? `Hey ${userName}!` : 'EduVerse Academy'}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Embark on an epic learning journey through science, technology, and critical thinking. 
              Complete challenges, earn badges, and level up your knowledge!
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-12">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{totalPoints}</div>
                <div className="text-blue-200">Total Points</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{level}</div>
                <div className="text-blue-200">Current Level</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{completedActivities.length}</div>
                <div className="text-blue-200">Activities Done</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-500 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => setCurrentView(feature.id)}
                >
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-blue-100 mb-6 group-hover:text-white transition-colors">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <motion.button
                        className={`px-6 py-2 rounded-full bg-gradient-to-r ${feature.color} text-white font-semibold hover:shadow-lg transition-all duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Learning
                      </motion.button>
                      
                      {feature.completed > 0 && (
                        <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                          {feature.completed} completed
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-2xl"
                    style={{
                      background: `linear-gradient(white/20, white/20) padding-box, linear-gradient(45deg, transparent, white/40, transparent) border-box`
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;