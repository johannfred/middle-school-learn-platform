export interface User {
  id: string;
  name: string;
  grade: number;
  totalPoints: number;
  level: number;
  badges: Badge[];
  completedActivities: string[];
  progress: Record<string, number>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
}

export interface ProgressData {
  user: User;
  activities: Record<string, Activity>;
  settings: {
    textToSpeech: boolean;
    colorblindMode: boolean;
  };
}