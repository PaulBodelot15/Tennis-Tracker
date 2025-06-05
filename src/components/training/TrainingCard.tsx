import React, { useState } from 'react';
import { Edit, Trash2, MoreVertical, Clock, Activity } from 'lucide-react';
import { Training } from '../../types';
import { useTrainingStore } from '../../store/trainingStore';
import TrainingForm from './TrainingForm';

interface TrainingCardProps {
  training: Training;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  const { deleteTraining } = useTrainingStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  
  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };
  
  // Get type color
  const getTypeColor = () => {
    switch(training.type) {
      case 'technique': return 'bg-primary-100 text-primary-800';
      case 'fitness': return 'bg-accent-100 text-accent-800';
      case 'match': return 'bg-success-50 text-success-500';
      case 'mental': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get intensity color
  const getIntensityColor = () => {
    switch(training.intensity) {
      case 'low': return 'text-gray-500';
      case 'medium': return 'text-accent-500';
      case 'high': return 'text-error-500';
      default: return 'text-gray-500';
    }
  };

  if (editing) {
    return (
      <div className="card">
        <TrainingForm training={training} onClose={() => setEditing(false)} />
      </div>
    );
  }
  
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor()}`}>
            {training.type.charAt(0).toUpperCase() + training.type.slice(1)}
          </span>
          <h3 className="text-lg font-semibold mt-2 text-gray-900 dark:text-gray-100">{training.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(training.date)}</p>
        </div>
        
        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical size={18} className="text-gray-500" />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setEditing(true);
                  setMenuOpen(false);
                }}
              >
                <Edit size={16} className="mr-2" />
                Edit
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  deleteTraining(training.id);
                  setMenuOpen(false);
                }}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-6 mb-3">
        <div className="flex items-center">
          <Clock size={16} className="mr-1.5 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {training.duration} min
          </span>
        </div>
        <div className="flex items-center">
          <Activity size={16} className={`mr-1.5 ${getIntensityColor()}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            {training.intensity} intensity
          </span>
        </div>
      </div>
      
      {training.feeling && (
        <div className="mb-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Feeling: {Array(5).fill(0).map((_, i) => (
              <span key={i} className={`text-lg ${i < training.feeling! ? 'text-accent-400' : 'text-gray-300 dark:text-gray-600'}`}>★</span>
            ))}
          </p>
        </div>
      )}
      
      {training.notes && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {training.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainingCard;