import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExpenseChart from '../components/ExpenseChart';
import BankCard from '../components/BankCard';
import ExpenseCategoryCard from '../components/ExpenseCategoryCard';

const Home: React.FC = () => {
  const banks = [
    {
      id: 1,
      name: 'Chase Bank',
      logo: '🏦',
      balance: 25840.50,
      lastTransaction: {
        id: 'TXN-001-2024',
        amount: -120.00,
        description: 'Online Purchase'
      }
    },
    {
      id: 2,
      name: 'Wells Fargo',
      logo: '🏛️',
      balance: 12950.75,
      lastTransaction: {
        id: 'TXN-002-2024',
        amount: 2500.00,
        description: 'Salary Deposit'
      }
    },
    {
      id: 3,
      name: 'Bank of America',
      logo: '🏧',
      balance: 8720.25,
      lastTransaction: {
        id: 'TXN-003-2024',
        amount: -45.99,
        description: 'Subscription Fee'
      }
    }
  ];

  const expenseCategories = [
    { name: 'Fuel', amount: 450.30, trend: 'up', percentage: 12 },
    { name: 'Travel', amount: 1250.00, trend: 'down', percentage: 8 },
    { name: 'Finance and Interests', amount: 320.50, trend: 'up', percentage: 5 },
    { name: 'Vehicle Maintenance', amount: 180.00, trend: 'down', percentage: 15 },
    { name: 'Foods and Beverages', amount: 680.75, trend: 'up', percentage: 3 }
  ];

  const recentTransactions = [
    { id: 'TXN-120', date: '2024-01-15', description: 'Grocery Store', amount: -89.50, bank: 'Chase Bank' },
    { id: 'TXN-119', date: '2024-01-14', description: 'Gas Station', amount: -55.00, bank: 'Wells Fargo' },
    { id: 'TXN-118', date: '2024-01-14', description: 'Salary', amount: 3500.00, bank: 'Chase Bank' },
    { id: 'TXN-117', date: '2024-01-13', description: 'Restaurant', amount: -125.30, bank: 'Bank of America' },
    { id: 'TXN-116', date: '2024-01-12', description: 'Online Shopping', amount: -245.99, bank: 'Wells Fargo' }
  ];

  const totalBalance = banks.reduce((sum, bank) => sum + bank.balance, 0);
  const totalCredits = recentTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-0">
      {/* Dashboard Overview Card */}
      <div className="dashboard-bg w-full">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 border-l-4 border-orange-500">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Balance</h3>
              <p className="text-4xl font-bold text-gray-900">${totalBalance.toLocaleString()}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-8 border-l-4 border-green-500">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Credits</h3>
              <p className="text-4xl font-bold text-green-600">${totalCredits.toLocaleString()}</p>
            </div>
          </div>

          {/* Bank Cards Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Connected Banks</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {banks.map((bank) => (
                <BankCard key={bank.id} bank={bank} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {expenseCategories.map((category) => (
            <ExpenseCategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>

      {/* Expense Tracker Chart */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Tracker</h2>
        <div className="bg-white border border-gray-200 p-6">
          <ExpenseChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
          <Link
            to="/transactions"
            className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
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
        </div>
      </div>
    </div>
  );
};

export default Home;