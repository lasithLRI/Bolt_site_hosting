import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ExpenseCategoryCardProps {
  category: {
    name: string;
    amount: number;
    trend: 'up' | 'down';
    percentage: number;
  };
}

const ExpenseCategoryCard: React.FC<ExpenseCategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{category.name}</h3>
        <div className={`flex items-center space-x-1 ${
          category.trend === 'up' ? 'text-red-500' : 'text-green-500'
        }`}>
          {category.trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-xs">{category.percentage}%</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">${category.amount.toFixed(2)}</p>
      <div className="mt-3">
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="h-1 bg-orange-500" 
            style={{ width: `${Math.min(category.percentage * 2, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoryCard;