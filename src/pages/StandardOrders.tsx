import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import AddStandardOrderModal from '../components/AddStandardOrderModal';

const StandardOrders: React.FC = () => {
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const standardOrders = Array.from({ length: 25 }, (_, i) => ({
    id: `SO-${String(i + 1).padStart(3, '0')}-2024`,
    name: ['Monthly Rent', 'Utilities', 'Insurance', 'Loan Payment', 'Subscription'][Math.floor(Math.random() * 5)],
    amount: Math.floor(Math.random() * 2000) + 100,
    frequency: ['Monthly', 'Weekly', 'Quarterly'][Math.floor(Math.random() * 3)],
    nextDate: new Date(2024, 1, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    bank: ['Chase Bank', 'Wells Fargo', 'Bank of America'][Math.floor(Math.random() * 3)],
    status: ['Active', 'Paused'][Math.floor(Math.random() * 2)]
  }));

  const totalPages = Math.ceil(standardOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = standardOrders.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    totalOrders: standardOrders.length,
    activeOrders: standardOrders.filter(o => o.status === 'Active').length,
    monthlyTotal: standardOrders.reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Standard Orders</h1>
        <button
          onClick={() => setShowAddOrder(true)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Standard Order</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeOrders}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Total</p>
            <p className="text-2xl font-bold text-gray-900">${stats.monthlyTotal.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Next Payment</p>
            <p className="text-lg font-semibold text-orange-500">Feb 15, 2024</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.frequency}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.nextDate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.bank}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right text-gray-900">
                  ${order.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, standardOrders.length)} of {standardOrders.length} results
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

      {/* Add Standard Order Modal */}
      {showAddOrder && (
        <AddStandardOrderModal onClose={() => setShowAddOrder(false)} />
      )}
    </div>
  );
};

export default StandardOrders;