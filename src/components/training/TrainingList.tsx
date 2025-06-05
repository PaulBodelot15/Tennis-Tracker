import React, { useState } from 'react';
import { Plus, Filter, CalendarRange } from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import TrainingCard from './TrainingCard';
import TrainingForm from './TrainingForm';
import EmptyState from '../ui/EmptyState';

const TrainingList: React.FC = () => {
  const { trainings } = useTrainingStore();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  // Filter trainings by type and date
  const filteredTrainings = trainings.filter((training) => {
    // Filter by type
    const typeMatch = filter === 'all' || training.type === filter;
    
    // Filter by date
    let dateMatch = true;
    if (dateFilter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      dateMatch = new Date(training.date) >= oneWeekAgo;
    } else if (dateFilter === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      dateMatch = new Date(training.date) >= oneMonthAgo;
    } else if (dateFilter === 'year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      dateMatch = new Date(training.date) >= oneYearAgo;
    }
    
    return typeMatch && dateMatch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">Training Journal</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="technique">Technique</option>
              <option value="fitness">Fitness</option>
              <option value="match">Match</option>
              <option value="mental">Mental</option>
              <option value="recovery">Recovery</option>
            </select>
            
            <select
              className="form-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
          
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} />
            <span>Add Session</span>
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="card mb-6">
          <TrainingForm onClose={() => setShowForm(false)} />
        </div>
      )}
      
      {filteredTrainings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            icon={CalendarRange}
            title="No training sessions found"
            description={filter !== 'all' || dateFilter !== 'all' 
              ? "Try changing your filters" 
              : "Add your first training session to get started"}
            action={
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Add a training session
              </button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default TrainingList;