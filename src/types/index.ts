// Todo Types
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  category: 'technique' | 'fitness' | 'strategy' | 'mental' | 'other';
}

// Player Types
export interface Player {
  id: string;
  name: string;
  rank?: string;
  playingStyle?: string;
  strengths?: string[];
  weaknesses?: string[];
  notes?: string;
  lastPlayed?: string;
}

// Training Types
export interface Training {
  id: string;
  date: string;
  title: string;
  duration: number; // in minutes
  intensity: 'low' | 'medium' | 'high';
  type: 'technique' | 'fitness' | 'match' | 'mental' | 'recovery';
  notes?: string;
  feeling?: number; // 1-5 scale
}

// Chart Data Types
export interface ChartData {
  name: string;
  value: number;
}