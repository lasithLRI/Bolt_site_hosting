import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import AddTransactionModal from '../components/AddTransactionModal';

const Transactions: React.FC = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const transactions = Array.from({ length: 50 }, (_, i) => ({
    id: `TXN-${String(i + 1).padStart(3, '0')}-2024`,
    date: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
    description: ['Grocery Store', 'Gas Station', 'Restaurant', 'Online Shopping', 'Salary', 'Utilities'][Math.floor(Math.random() * 6)],
    amount: (Math.random() - 0.3) * 1000,
    bank: ['Chase Bank', 'Wells Fargo', 'Bank of America'][Math.floor(Math.random() * 3)],
    category: ['Fuel', 'Travel', 'Finance', 'Vehicle', 'Food'][Math.floor(Math.random() * 5)]
  }));

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    totalTransactions: transactions.length,
    lastMonthChange: 12,
    bankWiseTotal: {
      'Chase Bank': transactions.filter(t => t.bank === 'Chase Bank').length,
      'Wells Fargo': transactions.filter(t => t.bank === 'Wells Fargo').length,
      'Bank of America': transactions.filter(t => t.bank === 'Bank of America').length,
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowAddTransaction(true)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</p>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+{stats.lastMonthChange}%</span>
            </div>
          </div>
        </div>

        {Object.entries(stats.bankWiseTotal).map(([bank, count]) => (
          <div key={bank} className="bg-white border border-gray-200 p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">{bank}</p>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.bank}</td>
                <td className={`px-6 py-4 text-sm font-medium text-right ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, transactions.length)} of {transactions.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm bg-gray-900 text-white">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <AddTransactionModal onClose={() => setShowAddTransaction(false)} />
      )}
    </div>
  );
};

export default Transactions;