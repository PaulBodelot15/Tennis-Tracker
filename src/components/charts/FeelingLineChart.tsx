import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrainingStore } from '../../store/trainingStore';
import { parseISO, format } from 'date-fns';

const FeelingLineChart: React.FC = () => {
  const { trainings } = useTrainingStore();
  
  const feelingData = useMemo(() => {
    // Filter trainings with feeling data and sort by date
    return trainings
      .filter(training => training.feeling !== undefined)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(training => ({
        date: format(parseISO(training.date), 'MMM dd'),
        feeling: training.feeling,
        title: training.title
      }));
  }, [trainings]);
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-primary-500">{`Feeling: ${payload[0].value}`}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{payload[0].payload.title}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={feelingData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="feeling"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeelingLineChart;