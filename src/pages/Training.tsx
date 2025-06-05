import React from 'react';
import TrainingList from '../components/training/TrainingList';

const Training: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Training Journal</h2>
      <TrainingList />
    </div>
  );
};

export default Training;