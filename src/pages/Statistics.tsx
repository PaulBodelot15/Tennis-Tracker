import React, { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import SessionsBarChart from '../components/charts/SessionsBarChart';
import TrainingTypePieChart from '../components/charts/TrainingTypePieChart';
import FeelingLineChart from '../components/charts/FeelingLineChart';

const Statistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Statistics</h2>
      
      <div className="card mb-6">
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'weekly'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('weekly')}
            >
              Weekly Overview
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'distribution'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('distribution')}
            >
              Training Distribution
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'progress'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('progress')}
            >
              Feeling Progress
            </button>
          </div>
        </div>
        
        <div>
          {activeTab === 'weekly' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Weekly Training Sessions</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sessions distribution across the current week, grouped by type.
              </p>
              <SessionsBarChart />
            </div>
          )}
          
          {activeTab === 'distribution' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Training Type Distribution</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Breakdown of your training sessions by type to help balance your practice.
              </p>
              <TrainingTypePieChart />
            </div>
          )}
          
          {activeTab === 'progress' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Feeling & Performance Trend</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Track how you've been feeling during your training sessions over time.
              </p>
              <FeelingLineChart />
            </div>
          )}
        </div>
      </div>
      
      <div className="card bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            <CalendarCheck className="h-6 w-6 text-primary-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Training Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your statistics are automatically generated based on your training journal entries. Add more training sessions to see more detailed insights about your tennis practice patterns and progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;