import React, { useState } from 'react';
import { useTrainingStore } from '../../store/trainingStore';
import { Training } from '../../types';

interface TrainingFormProps {
  training?: Training;
  onClose: () => void;
}

const TrainingForm: React.FC<TrainingFormProps> = ({ training, onClose }) => {
  const { addTraining, updateTraining } = useTrainingStore();
  const today = new Date().toISOString().split('T')[0];
  
  const [title, setTitle] = useState(training?.title || '');
  const [date, setDate] = useState(
    training?.date 
      ? new Date(training.date).toISOString().split('T')[0]
      : today
  );
  const [duration, setDuration] = useState(training?.duration?.toString() || '60');
  const [intensity, setIntensity] = useState(training?.intensity || 'medium');
  const [type, setType] = useState(training?.type || 'technique');
  const [notes, setNotes] = useState(training?.notes || '');
  const [feeling, setFeeling] = useState(training?.feeling?.toString() || '3');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trainingData = {
      title,
      date: new Date(date).toISOString(),
      duration: parseInt(duration),
      intensity: intensity as 'low' | 'medium' | 'high',
      type: type as 'technique' | 'fitness' | 'match' | 'mental' | 'recovery',
      notes,
      feeling: parseInt(feeling),
    };
    
    if (training) {
      updateTraining(training.id, trainingData);
    } else {
      addTraining(trainingData);
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="form-label">Session Title</label>
        <input
          id="title"
          type="text"
          className="form-input w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Forehand practice with coach"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="form-label">Date</label>
          <input
            id="date"
            type="date"
            className="form-input w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="form-label">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            min="5"
            step="5"
            className="form-input w-full"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="form-label">Type</label>
          <select
            id="type"
            className="form-select w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="technique">Technique</option>
            <option value="fitness">Fitness</option>
            <option value="match">Match</option>
            <option value="mental">Mental</option>
            <option value="recovery">Recovery</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="intensity" className="form-label">Intensity</label>
          <select
            id="intensity"
            className="form-select w-full"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="notes" className="form-label">Notes</label>
        <textarea
          id="notes"
          className="form-input w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Details about the session, what worked well, what needs improvement, etc."
          rows={4}
        />
      </div>
      
      <div>
        <label htmlFor="feeling" className="form-label">How did you feel? (1-5)</label>
        <div className="flex items-center">
          <input
            id="feeling"
            type="range"
            min="1"
            max="5"
            step="1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {feeling}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {training ? 'Update' : 'Add'} Session
        </button>
      </div>
    </form>
  );
};

export default TrainingForm;
