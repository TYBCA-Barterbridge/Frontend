import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, startOfDay, endOfDay, eachDayOfInterval, subDays } from 'date-fns';

const TradesOverTime = ({ data }) => {
  // Get the last 7 days
  const endDate = new Date();
  const startDate = subDays(endDate, 6); // Get 6 days ago to show 7 days total

  // Create an array of days
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Process trade data into daily counts
  const dailyData = days.map(day => {
    const tradesInDay = data?.filter(trade => {
      const tradeDate = new Date(trade.createdAt);
      return tradeDate >= startOfDay(day) && tradeDate <= endOfDay(day);
    }) || [];

    return {
      date: format(day, 'EEE'),
      count: tradesInDay.length,
      tooltip: format(day, 'MMM d, yyyy'),
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-gray-900">{payload[0].payload.tooltip}</p>
          <p className="text-sm text-gray-600">
            Trades: <span className="font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={dailyData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
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
        <Area
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TradesOverTime; 