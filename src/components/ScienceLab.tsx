import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Play, CheckCircle, Star, ArrowRight, Volume2 } from 'lucide-react';

interface ScienceLabProps {
  completeActivity: (id: string, points: number) => void;
  completedActivities: string[];
  settings: { textToSpeech: boolean; colorblindMode: boolean };
}

const ScienceLab: React.FC<ScienceLabProps> = ({ completeActivity, completedActivities, settings }) => {
  const [currentExperiment, setCurrentExperiment] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const experiments = [
    {
      id: 'science-volcano',
      title: 'Volcano Eruption',
      description: 'Create a safe chemical volcano with baking soda and vinegar',
      difficulty: 'easy' as const,
      points: 50,
      materials: ['Baking soda', 'White vinegar', 'Food coloring', 'Dish soap', 'Small bottle'],
      steps: [
        'Fill the bottle 1/3 with baking soda',
        'Add a few drops of food coloring',
        'Add a squirt of dish soap',
        'Quickly pour in vinegar and step back!',
        'Watch the chemical reaction create a foamy eruption'
      ],
      explanation: 'When baking soda (sodium bicarbonate) mixes with vinegar (acetic acid), they react to produce carbon dioxide gas, creating the bubbling effect.',
      quiz: {
        question: 'What gas is produced when baking soda reacts with vinegar?',
        options: ['Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Nitrogen'],
        correct: 'Carbon Dioxide'
      }
    },
    {
      id: 'science-rainbow',
      title: 'Rainbow in a Glass',
      description: 'Layer different colored liquids to create a density tower',
      difficulty: 'medium' as const,
      points: 75,
      materials: ['Honey', 'Corn syrup', 'Dish soap', 'Water', 'Vegetable oil', 'Rubbing alcohol', 'Food coloring'],
      steps: [
        'Pour honey into the bottom of a tall glass',
        'Slowly pour corn syrup over the back of a spoon',
        'Add colored dish soap the same way',
        'Pour colored water very slowly',
        'Add colored oil carefully',
        'Finally, add colored rubbing alcohol on top'
      ],
      explanation: 'Liquids with different densities will layer naturally, with the heaviest (honey) at the bottom and lightest (alcohol) at the top.',
      quiz: {
        question: 'Why do the liquids stay in separate layers?',
        options: ['Different temperatures', 'Different densities', 'Different colors', 'Magic'],
        correct: 'Different densities'
      }
    },
    {
      id: 'science-crystals',
      title: 'Growing Salt Crystals',
      description: 'Grow beautiful crystals using salt and water',
      difficulty: 'hard' as const,
      points: 100,
      materials: ['Salt', 'Hot water', 'String', 'Pencil', 'Glass jar', 'Food coloring (optional)'],
      steps: [
        'Heat water until very warm (ask an adult for help)',
        'Dissolve as much salt as possible in the water',
        'Tie string to a pencil and lower it into the solution',
        'Place the jar in a quiet spot for several days',
        'Watch as crystals slowly form on the string',
        'Observe the geometric patterns that develop'
      ],
      explanation: 'As water evaporates, salt molecules arrange themselves in regular, repeating patterns to form crystals.',
      quiz: {
        question: 'What causes crystals to form geometric shapes?',
        options: ['Random chance', 'Temperature', 'Molecular arrangement', 'Air pressure'],
        correct: 'Molecular arrangement'
      }
    }
  ];

  const speakText = (text: string) => {
    if (settings.textToSpeech && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startExperiment = (index: number) => {
    setCurrentExperiment(index);
    setCurrentStep(0);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowResult(false);
    speakText(`Starting experiment: ${experiments[index].title}`);
  };

  const nextStep = () => {
    const experiment = experiments[currentExperiment!];
    if (currentStep < experiment.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      speakText(experiment.steps[currentStep + 1]);
    } else {
      setShowQuiz(true);
      speakText('Experiment complete! Time for a quiz question.');
    }
  };

  const submitQuiz = () => {
    const experiment = experiments[currentExperiment!];
    setShowResult(true);
    
    if (selectedAnswer === experiment.quiz.correct) {
      completeActivity(experiment.id, experiment.points);
      speakText('Correct! Well done on completing this experiment.');
    } else {
      speakText('Not quite right. Try the experiment again to learn more!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  if (currentExperiment !== null) {
    const experiment = experiments[currentExperiment];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => setCurrentExperiment(null)}
            className="mb-6 text-green-300 hover:text-white transition-colors flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back to Experiments</span>
          </motion.button>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Beaker className="w-8 h-8 mr-3 text-green-400" />
                {experiment.title}
              </h1>
              <button
                onClick={() => speakText(experiment.description)}
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Volume2 className="w-5 h-5 text-white" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!showQuiz ? (
                <motion.div
                  key="experiment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-green-300 mb-4">Materials Needed:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {experiment.materials.map((material, index) => (
                        <div key={index} className="bg-green-500/20 text-green-200 px-3 py-2 rounded-lg text-sm">
                          {material}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-green-300 mb-4">
                      Step {currentStep + 1} of {experiment.steps.length}
                    </h3>
                    
                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 mb-6">
                      <p className="text-white text-lg">{experiment.steps[currentStep]}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {experiment.steps.map((_, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                              index <= currentStep ? 'bg-green-400' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <motion.button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{currentStep < experiment.steps.length - 1 ? 'Next Step' : 'Finish Experiment'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">Science Explanation:</h3>
                    <p className="text-blue-100">{experiment.explanation}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">Quiz Time!</h3>
                  
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-6 mb-6">
                    <p className="text-white text-lg mb-6">{experiment.quiz.question}</p>
                    
                    <div className="space-y-3">
                      {experiment.quiz.options.map((option) => (
                        <motion.button
                          key={option}
                          onClick={() => setSelectedAnswer(option)}
                          className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                            selectedAnswer === option
                              ? 'bg-purple-600/50 border-2 border-purple-400 text-white'
                              : 'bg-white/10 border border-white/20 text-blue-100 hover:bg-white/20'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {selectedAnswer && (
                    <motion.button
                      onClick={submitQuiz}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Answer
                    </motion.button>
                  )}

                  {showResult && (
                    <motion.div
                      className={`mt-6 p-6 rounded-xl ${
                        selectedAnswer === experiment.quiz.correct
                          ? 'bg-green-500/20 border border-green-500/30'
                          : 'bg-red-500/20 border border-red-500/30'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {selectedAnswer === experiment.quiz.correct ? (
                        <div className="text-center">
                          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-green-300 mb-2">Excellent Work!</h3>
                          <p className="text-green-100">You've earned {experiment.points} points!</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-xl font-semibold text-red-300 mb-2">Not Quite Right</div>
                          <p className="text-red-100 mb-4">The correct answer is: {experiment.quiz.correct}</p>
                          <p className="text-red-100">Try the experiment again to better understand the science!</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            Science Laboratory
          </h1>
          <p className="text-green-200 text-lg">
            Conduct amazing experiments and discover the wonders of science!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((experiment, index) => {
            const isCompleted = completedActivities.includes(experiment.id);
            
            return (
              <motion.div
                key={experiment.id}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Beaker className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(experiment.difficulty)}`}>
                        {experiment.difficulty}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                    {experiment.title}
                  </h3>
                  
                  <p className="text-green-100 mb-4 group-hover:text-white transition-colors">
                    {experiment.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={() => startExperiment(index)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" />
                      <span>{isCompleted ? 'Try Again' : 'Start Experiment'}</span>
                    </motion.button>
                    
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-semibold">{experiment.points}</span>
                    </div>
                  </div>
                </div>

                {isCompleted && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Completed
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScienceLab;