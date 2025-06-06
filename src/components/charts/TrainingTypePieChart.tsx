import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTrainingStore } from '../../store/trainingStore';

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#6B7280'];

const TrainingTypePieChart: React.FC = () => {
  const { trainings } = useTrainingStore();
  
  const typeData = useMemo(() => {
    const typeCounts = trainings.reduce((acc, training) => {
      const { type } = training;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(typeCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      value,
    }));
  }, [trainings]);
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p style={{ color: payload[0].color }} className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={typeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {typeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingTypePieChart;
