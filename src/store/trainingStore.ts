import { create } from 'zustand';
import { Training } from '../types';

interface TrainingState {
  trainings: Training[];
  addTraining: (training: Omit<Training, 'id'>) => void;
  updateTraining: (id: string, updates: Partial<Omit<Training, 'id'>>) => void;
  deleteTraining: (id: string) => void;
}

const loadTrainings = (): Training[] => {
  const saved = localStorage.getItem('tennis-tracker-trainings');
  return saved ? JSON.parse(saved) : [];
};

const saveTrainings = (trainings: Training[]) => {
  localStorage.setItem('tennis-tracker-trainings', JSON.stringify(trainings));
};

export const useTrainingStore = create<TrainingState>((set) => ({
  trainings: loadTrainings(),
  addTraining: (training) => {
    const newTraining: Training = {
      ...training,
      id: crypto.randomUUID(),
    };

    set((state) => {
      const updatedTrainings = [...state.trainings, newTraining];
      saveTrainings(updatedTrainings);
      return { trainings: updatedTrainings };
    });
  },
  updateTraining: (id, updates) => {
    set((state) => {
      const updatedTrainings = state.trainings.map((training) => 
        training.id === id ? { ...training, ...updates } : training
      );
      saveTrainings(updatedTrainings);
      return { trainings: updatedTrainings };
    });
  },
  deleteTraining: (id) => {
    set((state) => {
      const updatedTrainings = state.trainings.filter((training) => training.id !== id);
      saveTrainings(updatedTrainings);
      return { trainings: updatedTrainings };
    });
  },
}));
