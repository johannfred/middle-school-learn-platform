import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Star, CheckCircle, RotateCcw, Lightbulb, Volume2 } from 'lucide-react';

interface LogicGamesProps {
  completeActivity: (id: string, points: number) => void;
  completedActivities: string[];
  settings: { textToSpeech: boolean; colorblindMode: boolean };
}

const LogicGames: React.FC<LogicGamesProps> = ({ completeActivity, completedActivities, settings }) => {
  const [currentGame, setCurrentGame] = useState<number | null>(null);
  const [gameState, setGameState] = useState<any>({});
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const games = [
    {
      id: 'games-puzzle-sequence',
      title: 'Number Sequence Puzzle',
      description: 'Find the missing number in the sequence',
      difficulty: 'easy' as const,
      points: 40,
      type: 'sequence',
      puzzles: [
        { sequence: [2, 4, 6, 8, '?'], answer: 10, hint: 'Each number increases by 2' },
        { sequence: [1, 1, 2, 3, 5, '?'], answer: 8, hint: 'Each number is the sum of the two before it (Fibonacci)' },
        { sequence: [100, 50, 25, 12.5, '?'], answer: 6.25, hint: 'Each number is half of the previous' }
      ]
    },
    {
      id: 'games-logic-riddles',
      title: 'Logic Riddles',
      description: 'Solve brain-teasing riddles using logic',
      difficulty: 'medium' as const,
      points: 60,
      type: 'riddle',
      riddles: [
        {
          question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
          options: ['A plant', 'Fire', 'A balloon', 'A robot'],
          answer: 'Fire',
          explanation: 'Fire grows by consuming fuel, needs oxygen from air to burn, and is extinguished by water.'
        },
        {
          question: "The more you take, the more you leave behind. What am I?",
          options: ['Footsteps', 'Money', 'Time', 'Memories'],
          answer: 'Footsteps',
          explanation: 'The more steps you take, the more footprints you leave behind you.'
        }
      ]
    },
    {
      id: 'games-pattern-match',
      title: 'Pattern Matching',
      description: 'Complete the visual patterns',
      difficulty: 'hard' as const,
      points: 80,
      type: 'pattern',
      patterns: [
        {
          grid: [['🔴', '🔵', '🔴'], ['🔵', '🔴', '🔵'], ['🔴', '?', '🔴']],
          options: ['🔴', '🔵', '🟡', '🟢'],
          answer: '🔵',
          hint: 'Look at the alternating pattern in each row and column'
        }
      ]
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

  const initializeGame = (gameIndex: number) => {
    const game = games[gameIndex];
    let initialState = {};
    
    switch (game.type) {
      case 'sequence':
        initialState = { currentPuzzle: 0, userAnswer: '', completed: false };
        break;
      case 'riddle':
        initialState = { currentRiddle: 0, selectedAnswer: '', showExplanation: false };
        break;
      case 'pattern':
        initialState = { currentPattern: 0, selectedOption: '', completed: false };
        break;
    }
    
    setGameState(initialState);
    setAttempts(0);
    setShowHint(false);
    speakText(`Starting ${game.title}`);
  };

  const checkAnswer = (answer: any) => {
    const game = games[currentGame!];
    setAttempts(prev => prev + 1);
    
    let isCorrect = false;
    
    switch (game.type) {
      case 'sequence':
        const puzzle = game.puzzles[gameState.currentPuzzle];
        isCorrect = parseFloat(answer) === puzzle.answer;
        break;
      case 'riddle':
        const riddle = game.riddles[gameState.currentRiddle];
        isCorrect = answer === riddle.answer;
        break;
      case 'pattern':
        const pattern = game.patterns[gameState.currentPattern];
        isCorrect = answer === pattern.answer;
        break;
    }
    
    if (isCorrect) {
      completeActivity(game.id, game.points);
      setGameState(prev => ({ ...prev, completed: true }));
      speakText('Excellent! You solved it correctly!');
    } else {
      speakText('Not quite right. Try again or check the hint!');
    }
    
    return isCorrect;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-purple-400 bg-purple-400/20';
    }
  };

  const renderSequenceGame = (game: any) => {
    const puzzle = game.puzzles[gameState.currentPuzzle || 0];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Find the Missing Number:</h3>
          <div className="flex justify-center items-center space-x-4 mb-6">
            {puzzle.sequence.map((num: any, index: number) => (
              <motion.div
                key={index}
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold ${
                  num === '?' 
                    ? 'bg-yellow-500/30 border-2 border-yellow-400 text-yellow-300' 
                    : 'bg-purple-500/30 text-purple-200 border border-purple-500/50'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {num}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <input
            type="number"
            value={gameState.userAnswer || ''}
            onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
            className="w-32 h-12 bg-gray-800 text-white text-center text-xl rounded-xl border border-purple-500/50 focus:border-purple-400 focus:outline-none"
            placeholder="?"
          />
        </div>

        {showHint && (
          <motion.div
            className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <p className="text-blue-200">{puzzle.hint}</p>
          </motion.div>
        )}

        <div className="flex justify-center space-x-4">
          <motion.button
            onClick={() => checkAnswer(gameState.userAnswer)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Answer
          </motion.button>
          
          <motion.button
            onClick={() => setShowHint(!showHint)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="w-5 h-5" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </motion.button>
        </div>
      </div>
    );
  };

  const renderRiddleGame = (game: any) => {
    const riddle = game.riddles[gameState.currentRiddle || 0];
    
    return (
      <div className="space-y-6">
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-6">
          <p className="text-white text-lg text-center">{riddle.question}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riddle.options.map((option: string) => (
            <motion.button
              key={option}
              onClick={() => {
                setGameState(prev => ({ ...prev, selectedAnswer: option }));
                checkAnswer(option);
              }}
              className={`p-4 rounded-xl transition-all duration-300 ${
                gameState.selectedAnswer === option
                  ? 'bg-purple-600/50 border-2 border-purple-400 text-white'
                  : 'bg-white/10 border border-white/20 text-purple-100 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {gameState.completed && (
          <motion.div
            className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-green-300 font-semibold mb-2">Correct!</h3>
            <p className="text-green-200">{riddle.explanation}</p>
          </motion.div>
        )}
      </div>
    );
  };

  const renderPatternGame = (game: any) => {
    const pattern = game.patterns[gameState.currentPattern || 0];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Complete the Pattern:</h3>
          <div className="inline-grid grid-cols-3 gap-2 mb-6">
            {pattern.grid.map((row: string[], rowIndex: number) =>
              row.map((cell: string, colIndex: number) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                    cell === '?' 
                      ? 'bg-yellow-500/30 border-2 border-yellow-400' 
                      : 'bg-purple-500/30 border border-purple-500/50'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (rowIndex * 3 + colIndex) * 0.1 }}
                >
                  {cell}
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {pattern.options.map((option: string) => (
            <motion.button
              key={option}
              onClick={() => {
                setGameState(prev => ({ ...prev, selectedOption: option }));
                checkAnswer(option);
              }}
              className={`w-16 h-16 rounded-xl text-3xl transition-all duration-300 ${
                gameState.selectedOption === option
                  ? 'bg-purple-600 border-2 border-purple-400'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {showHint && (
          <motion.div
            className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <p className="text-blue-200">{pattern.hint}</p>
          </motion.div>
        )}

        <div className="flex justify-center">
          <motion.button
            onClick={() => setShowHint(!showHint)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="w-5 h-5" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </motion.button>
        </div>
      </div>
    );
  };

  if (currentGame !== null) {
    const game = games[currentGame];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => setCurrentGame(null)}
            className="mb-6 text-purple-300 hover:text-white transition-colors flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span>← Back to Games</span>
          </motion.button>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Gamepad2 className="w-8 h-8 mr-3 text-purple-400" />
                {game.title}
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => speakText(game.description)}
                  className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Volume2 className="w-5 h-5 text-white" />
                </button>
                <div className="text-purple-200">
                  Attempts: {attempts}
                </div>
              </div>
            </div>

            {game.type === 'sequence' && renderSequenceGame(game)}
            {game.type === 'riddle' && renderRiddleGame(game)}
            {game.type === 'pattern' && renderPatternGame(game)}

            {gameState.completed && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-300 mb-2">Puzzle Solved!</h2>
                  <p className="text-green-200">You earned {game.points} points!</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Logic Games
          </h1>
          <p className="text-purple-200 text-lg">
            Challenge your mind with puzzles, riddles, and brain teasers!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => {
            const isCompleted = completedActivities.includes(game.id);
            
            return (
              <motion.div
                key={game.id}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {game.title}
                  </h3>
                  
                  <p className="text-purple-100 mb-4 group-hover:text-white transition-colors">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={() => {
                        setCurrentGame(index);
                        initializeGame(index);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCompleted ? 'Play Again' : 'Start Game'}
                    </motion.button>
                    
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-semibold">{game.points}</span>
                    </div>
                  </div>
                </div>

                {isCompleted && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Solved
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

export default LogicGames;