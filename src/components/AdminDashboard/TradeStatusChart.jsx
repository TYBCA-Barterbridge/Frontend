import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const TradeStatusChart = ({ trades }) => {
  // Process trades data to get counts by type and status
  const processedData = trades?.reduce((acc, trade) => {
    const status = trade.completed ? 'Completed' : 'Pending';
    const type = trade.type || 'Goods'; // Default to Goods if type is not specified
    
    const existingStatus = acc.find(item => item.status === status);
    if (existingStatus) {
      if (type === 'Skills') {
        existingStatus.skills += 1;
      } else {
        existingStatus.goods += 1;
      }
    } else {
      acc.push({
        status,
        goods: type === 'Skills' ? 0 : 1,
        skills: type === 'Skills' ? 1 : 0,
      });
    }
    return acc;
  }, []) || [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="goods" name="Goods" fill="#8884d8" />
        <Bar dataKey="skills" name="Skills" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TradeStatusChart; 