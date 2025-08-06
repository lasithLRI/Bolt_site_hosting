import React from 'react';

interface BankCardProps {
  bank: {
    id: number;
    name: string;
    logo: string;
    balance: number;
    lastTransaction: {
      id: string;
      amount: number;
      description: string;
    };
  };
}

const BankCard: React.FC<BankCardProps> = ({ bank }) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">{bank.logo}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{bank.name}</h3>
            <p className="text-xs text-gray-500">Account Active</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Available Balance</p>
        <p className="text-3xl font-bold text-gray-900">${bank.balance.toLocaleString()}</p>
      </div>
      <div className="border-t pt-4">
        <p className="text-xs text-gray-500 mb-2">Last Transaction</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-900">{bank.lastTransaction.id}</span>
          <span className={`font-semibold ${
            bank.lastTransaction.amount > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${Math.abs(bank.lastTransaction.amount).toFixed(2)}
          </span>
        </div>
        <div className="text-sm mt-1">
          <span className="text-gray-900">{bank.lastTransaction.description}</span>
        </div>
      </div>
    </div>
  );
};

export default BankCard;