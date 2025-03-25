import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks } from 'date-fns';

const UserGrowthChart = ({ data }) => {
  // Get the last 7 weeks of data
  const endDate = new Date();
  const startDate = subWeeks(endDate, 6); // Get 6 weeks ago to show 7 weeks total

  // Create an array of week ranges
  const weeks = Array.from({ length: 7 }, (_, i) => {
    const weekStart = startOfWeek(subWeeks(endDate, 6 - i));
    const weekEnd = endOfWeek(weekStart);
    return {
      start: weekStart,
      end: weekEnd,
      label: `Week ${i + 1}`,
    };
  });

  // Process user data into weekly counts
  const weeklyData = weeks.map(week => {
    const usersInWeek = data?.filter(user => {
      const userDate = new Date(user.createdAt);
      return userDate >= week.start && userDate <= week.end;
    }) || [];

    return {
      date: week.label,
      count: usersInWeek.length,
      tooltip: `${format(week.start, 'MMM d')} - ${format(week.end, 'MMM d')}`,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-gray-900">{payload[0].payload.tooltip}</p>
          <p className="text-sm text-gray-600">
            New Users: <span className="font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={weeklyData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date"
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart; 