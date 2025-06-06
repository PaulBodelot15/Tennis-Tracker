import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTrainingStore } from '../../store/trainingStore';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

const SessionsBarChart: React.FC = () => {
  const { trainings } = useTrainingStore();
  
  const weeklyData = useMemo(() => {
    if (trainings.length === 0) return [];
    
    const now = new Date();
    const startDate = startOfWeek(now, { weekStartsOn: 1 }); // Start on Monday
    const endDate = endOfWeek(now, { weekStartsOn: 1 });
    
    // Create array for each day of the current week
    const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });
    
    return daysOfWeek.map(day => {
      const dayTrainings = trainings.filter(training => 
        isSameDay(parseISO(training.date), day)
      );
      
      // Group by type
      const technique = dayTrainings.filter(t => t.type === 'technique').length;
      const fitness = dayTrainings.filter(t => t.type === 'fitness').length;
      const match = dayTrainings.filter(t => t.type === 'match').length;
      const mental = dayTrainings.filter(t => t.type === 'mental').length;
      const recovery = dayTrainings.filter(t => t.type === 'recovery').length;
      
      return {
        name: format(day, 'EEE'),
        technique,
        fitness,
        match,
        mental,
        recovery,
        total: dayTrainings.length
      };
    });
  }, [trainings]);
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="technique" name="Technique" stackId="a" fill="#3B82F6" />
          <Bar dataKey="fitness" name="Fitness" stackId="a" fill="#F59E0B" />
          <Bar dataKey="match" name="Match" stackId="a" fill="#10B981" />
          <Bar dataKey="mental" name="Mental" stackId="a" fill="#8B5CF6" />
          <Bar dataKey="recovery" name="Recovery" stackId="a" fill="#6B7280" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionsBarChart;
