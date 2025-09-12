import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, CheckCircle, Star, ArrowRight, Copy, Volume2 } from 'lucide-react';

interface CodeAcademyProps {
  completeActivity: (id: string, points: number) => void;
  completedActivities: string[];
  settings: { textToSpeech: boolean; colorblindMode: boolean };
}

const CodeAcademy: React.FC<CodeAcademyProps> = ({ completeActivity, completedActivities, settings }) => {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const lessons = [
    {
      id: 'coding-variables',
      title: 'Variables & Data Types',
      description: 'Learn how to store information in your programs',
      difficulty: 'easy' as const,
      points: 60,
      language: 'JavaScript',
      explanation: 'Variables are like containers that hold data. You can store numbers, text, and other information.',
      example: `// Creating variables in JavaScript
let myName = "Alex";
let age = 13;
let isStudent = true;

console.log("Hello, " + myName);
console.log("You are " + age + " years old");`,
      challenge: 'Create a variable called "favoriteSubject" and set it to your favorite school subject. Then use console.log to display it.',
      solution: `let favoriteSubject = "Science";
console.log("My favorite subject is " + favoriteSubject);`,
      testCode: (code: string) => {
        return code.includes('favoriteSubject') && code.includes('console.log');
      }
    },
    {
      id: 'coding-functions',
      title: 'Functions & Logic',
      description: 'Create reusable code blocks that perform specific tasks',
      difficulty: 'medium' as const,
      points: 80,
      language: 'JavaScript',
      explanation: 'Functions are like mini-programs within your program. They can take inputs, process them, and return results.',
      example: `// Creating a function
function greetStudent(name) {
    return "Welcome to EduVerse, " + name + "!";
}

// Using the function
let message = greetStudent("Maya");
console.log(message);`,
      challenge: 'Create a function called "calculateAge" that takes a birth year and returns the current age. Use 2025 as the current year.',
      solution: `function calculateAge(birthYear) {
    return 2025 - birthYear;
}

let age = calculateAge(2010);
console.log("You are " + age + " years old");`,
      testCode: (code: string) => {
        return code.includes('function calculateAge') && code.includes('2025');
      }
    },
    {
      id: 'coding-loops',
      title: 'Loops & Repetition',
      description: 'Make your code repeat actions automatically',
      difficulty: 'hard' as const,
      points: 100,
      language: 'JavaScript',
      explanation: 'Loops allow you to repeat code multiple times without writing it over and over again.',
      example: `// Using a for loop to count
for (let i = 1; i <= 5; i++) {
    console.log("Count: " + i);
}

// Using a while loop
let countdown = 3;
while (countdown > 0) {
    console.log(countdown);
    countdown--;
}
console.log("Blast off!");`,
      challenge: 'Create a for loop that prints the multiplication table for 7 (7x1, 7x2, up to 7x10).',
      solution: `for (let i = 1; i <= 10; i++) {
    console.log("7 x " + i + " = " + (7 * i));
}`,
      testCode: (code: string) => {
        return code.includes('for') && code.includes('7') && code.includes('*');
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

  const runCode = () => {
    try {
      // Create a safe console object to capture output
      const logs: string[] = [];
      const safeConsole = {
        log: (...args: any[]) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        }
      };

      // Create a function that runs the user's code safely
      const userFunction = new Function('console', userCode);
      userFunction(safeConsole);
      
      setOutput(logs.join('\n') || 'Code ran successfully (no output)');
      
      // Check if the challenge is completed
      const lesson = lessons[currentLesson!];
      if (lesson.testCode(userCode)) {
        completeActivity(lesson.id, lesson.points);
        speakText('Congratulations! Challenge completed successfully.');
      }
    } catch (error) {
      setOutput('Error: ' + (error as Error).message);
      speakText('There seems to be an error in your code. Check the syntax and try again.');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    speakText('Code copied to clipboard');
  };

  const startLesson = (index: number) => {
    setCurrentLesson(index);
    setUserCode('// Write your code here\n');
    setOutput('');
    setShowSolution(false);
    speakText(`Starting lesson: ${lessons[index].title}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  if (currentLesson !== null) {
    const lesson = lessons[currentLesson];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => setCurrentLesson(null)}
            className="mb-6 text-blue-300 hover:text-white transition-colors flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back to Lessons</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lesson Content */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <Code className="w-6 h-6 mr-3 text-blue-400" />
                  {lesson.title}
                </h1>
                <button
                  onClick={() => speakText(lesson.explanation)}
                  className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Volume2 className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-3">What You'll Learn:</h3>
                  <p className="text-blue-100">{lesson.explanation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-3">Example Code:</h3>
                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm relative group">
                    <button
                      onClick={() => copyCode(lesson.example)}
                      className="absolute top-2 right-2 p-2 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                    <pre className="text-green-400 whitespace-pre-wrap">{lesson.example}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-300 mb-3">Your Challenge:</h3>
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
                    <p className="text-yellow-100">{lesson.challenge}</p>
                  </div>
                </div>

                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-green-300 mb-3">Solution:</h3>
                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
                      <pre className="text-green-400 whitespace-pre-wrap">{lesson.solution}</pre>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  onClick={() => setShowSolution(!showSolution)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </motion.button>
              </div>
            </motion.div>

            {/* Code Editor */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Code Playground</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-2">
                    Your Code ({lesson.language}):
                  </label>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    placeholder="// Write your code here..."
                  />
                </div>

                <motion.button
                  onClick={runCode}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Run Code</span>
                </motion.button>

                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-2">Output:</label>
                  <div className="bg-gray-900 rounded-xl p-4 h-32 overflow-auto font-mono text-sm border border-gray-700">
                    <pre className="text-gray-300 whitespace-pre-wrap">{output || 'Run your code to see output here...'}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-4">
            Code Academy
          </h1>
          <p className="text-blue-200 text-lg">
            Learn programming step by step with interactive lessons and challenges!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => {
            const isCompleted = completedActivities.includes(lesson.id);
            
            return (
              <motion.div
                key={lesson.id}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-blue-100 mb-4 group-hover:text-white transition-colors">
                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={() => startLesson(index)}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" />
                      <span>{isCompleted ? 'Practice Again' : 'Start Lesson'}</span>
                    </motion.button>
                    
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-semibold">{lesson.points}</span>
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

export default CodeAcademy;