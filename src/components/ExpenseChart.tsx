import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ExpenseChart: React.FC = () => {
  const data = [
    { month: 'Jan', fuel: 420, travel: 1200, finance: 300, vehicle: 180, food: 650 },
    { month: 'Feb', fuel: 380, travel: 980, finance: 320, vehicle: 200, food: 600 },
    { month: 'Mar', fuel: 450, travel: 1250, finance: 315, vehicle: 160, food: 680 },
    { month: 'Apr', fuel: 400, travel: 1100, finance: 330, vehicle: 190, food: 720 },
    { month: 'May', fuel: 470, travel: 1350, finance: 295, vehicle: 220, food: 590 },
    { month: 'Jun', fuel: 430, travel: 1180, finance: 310, vehicle: 175, food: 640 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="fuel" stroke="#FF9666" strokeWidth={2} name="Fuel" />
          <Line type="monotone" dataKey="travel" stroke="#1f2937" strokeWidth={2} name="Travel" />
          <Line type="monotone" dataKey="finance" stroke="#6b7280" strokeWidth={2} name="Finance" />
          <Line type="monotone" dataKey="vehicle" stroke="#9ca3af" strokeWidth={2} name="Vehicle" />
          <Line type="monotone" dataKey="food" stroke="#d1d5db" strokeWidth={2} name="Food" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;