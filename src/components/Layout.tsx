import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, Calendar, Plus, User, Shield } from 'lucide-react';
import AddAccountModal from './AddAccountModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [showAddAccount, setShowAddAccount] = useState(false);

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Transactions', path: '/transactions', icon: CreditCard },
    { name: 'Standard Orders', path: '/standard-orders', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-sm">
                <Shield className="w-6 h-6" />
              </div>
              <div className="relative nav-item">
                <span className="text-xl font-bold text-gray-900">Safe Port</span>
                <div className="nav-hover-tooltip">
                  Safe Port V 2.3.1 - Fintech Open Banking
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-sm transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-white bg-gray-900'
                      : 'text-gray-700 hover:text-white hover:bg-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <button
                onClick={() => setShowAddAccount(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-white hover:bg-gray-900 rounded-sm transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Add Account</span>
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">Premium Account</div>
              </div>
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Add Account Modal */}
      {showAddAccount && (
        <AddAccountModal onClose={() => setShowAddAccount(false)} />
      )}
    </div>
  );
};

export default Layout;