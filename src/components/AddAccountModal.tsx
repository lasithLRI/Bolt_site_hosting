import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddAccountModalProps {
  onClose: () => void;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ onClose }) => {
  const [selectedBank, setSelectedBank] = useState('');

  const banks = [
    { name: 'Chase Bank', logo: '🏦' },
    { name: 'Wells Fargo', logo: '🏛️' },
    { name: 'Bank of America', logo: '🏧' },
    { name: 'Citibank', logo: '🏪' },
    { name: 'US Bank', logo: '🏦' },
    { name: 'TD Bank', logo: '🏛️' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBank) {
      console.log('Adding account for:', selectedBank);
      onClose();
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Bank Account</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Select Bank</label>
            <div className="grid grid-cols-1 gap-3">
              {banks.map((bank) => (
                <label key={bank.name} className="flex items-center space-x-3 p-4 border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="bank"
                    value={bank.name}
                    checked={selectedBank === bank.name}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-2xl">{bank.logo}</span>
                  <span className="font-medium text-gray-900">{bank.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedBank}
              className="flex-1 px-6 py-3 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Connect Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;