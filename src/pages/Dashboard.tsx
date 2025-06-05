import React from 'react';
import { Activity, CheckSquare, Clock, User } from 'lucide-react';
import { useTrainingStore } from '../store/trainingStore';
import { useTodoStore } from '../store/todoStore';
import { usePlayerStore } from '../store/playerStore';
import SessionsBarChart from '../components/charts/SessionsBarChart';
import TrainingTypePieChart from '../components/charts/TrainingTypePieChart';
import FeelingLineChart from '../components/charts/FeelingLineChart';

const Dashboard: React.FC = () => {
  const { trainings } = useTrainingStore();
  const { todos } = useTodoStore();
  const { players } = usePlayerStore();
  
  // Get active todos
  const activeTodos = todos.filter(todo => !todo.completed);
  
  // Calculate total training time
  const totalTrainingMinutes = trainings.reduce((total, training) => {
    return total + training.duration;
  }, 0);
  
  // Format total time
  const formatTotalTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Get today's training sessions
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTrainings = trainings.filter(training => {
    const trainingDate = new Date(training.date);
    trainingDate.setHours(0, 0, 0, 0);
    return trainingDate.getTime() === today.getTime();
  });
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Sessions</p>
              <p className="text-3xl font-bold text-primary-500 mt-1">{trainings.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <Activity size={24} className="text-primary-500" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Training Time</p>
              <p className="text-3xl font-bold text-primary-500 mt-1">{formatTotalTime(totalTrainingMinutes)}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <Clock size={24} className="text-primary-500" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Tasks</p>
              <p className="text-3xl font-bold text-primary-500 mt-1">{activeTodos.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <CheckSquare size={24} className="text-primary-500" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Players Database</p>
              <p className="text-3xl font-bold text-primary-500 mt-1">{players.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <User size={24} className="text-primary-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Today's sessions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Today's Sessions</h3>
        {todayTrainings.length > 0 ? (
          <div className="space-y-3">
            {todayTrainings.map((training) => (
              <div key={training.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="mr-3">
                  <span className="inline-block h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 flex items-center justify-center">
                    <Activity size={16} />
                  </span>
                </div>
                <div>
                  <p className="font-medium">{training.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {training.duration} min • {training.type.charAt(0).toUpperCase() + training.type.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No sessions scheduled for today.</p>
        )}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Sessions This Week</h3>
          <SessionsBarChart />
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Training Type Distribution</h3>
          <TrainingTypePieChart />
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Performance Feeling Trend</h3>
        <FeelingLineChart />
      </div>
      
      {/* Priority Tasks */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Priority Tasks</h3>
        </div>
        {activeTodos.length > 0 ? (
          <div className="space-y-2">
            {activeTodos.slice(0, 3).map((todo) => (
              <div key={todo.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="mr-3">
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    todo.priority === 'high' ? 'bg-error-500' : 
                    todo.priority === 'medium' ? 'bg-accent-400' : 
                    'bg-gray-400'
                  }`}></span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{todo.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {todo.category} • {todo.priority} priority
                  </p>
                </div>
              </div>
            ))}
            {activeTodos.length > 3 && (
              <p className="text-sm text-primary-500 font-medium">
                +{activeTodos.length - 3} more tasks
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No priority tasks at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
