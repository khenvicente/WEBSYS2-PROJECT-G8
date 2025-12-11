import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { PlusIcon } from '@heroicons/react/24/solid';

const ContractPage: React.FC = () => {
  const { contracts, loading, error, createContract } = useContract();
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!customerId) {
      setMessage('Please enter a Customer ID');
      return;
    }
    
    setSubmitting(true);
    setMessage(null);
    
    try {
      const res = await createContract(Number(customerId));
      setMessage(res?.message || 'Contract created successfully!');
      setCustomerId('');
    } catch (err: any) {
      setMessage(err.message || 'Error creating contract.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-purple-900 mb-2">
          Contracts 📜
        </h1>
        <p className="text-gray-600">
          Manage familiar contracts between customers and familiars
        </p>
      </div>

      {/* CREATE CONTRACT SECTION */}
      <div className="p-6 bg-white shadow-lg rounded-2xl max-w-md mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <PlusIcon className="w-6 h-6" />
          Create New Contract
        </h2>

        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full p-3 border border-purple-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          min="1"
        />

        <button
          onClick={handleCreate}
          disabled={submitting || !customerId}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          {submitting ? 'Processing...' : 'Create Contract'}
        </button>

        {message && (
          <div className={`mt-4 p-3 rounded-lg ${
            message.includes('Error') || message.includes('failed') || message.includes('No familiars')
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            <p className="font-medium">{message}</p>
          </div>
        )}
      </div>

      {/* CONTRACT COUNT */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total Contracts: <span className="font-bold text-purple-700">{contracts.length}</span>
        </p>
      </div>

      {/* CONTRACT LIST */}
      <div>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Existing Contracts</h2>

        {contracts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <span className="text-6xl mb-4 block">📜</span>
            <p className="text-lg text-gray-600 font-medium">No contracts found.</p>
            <p className="text-sm text-gray-500 mt-2">Create your first contract above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contracts.map((c) => (
              <div 
                key={c.ContractID} 
                className="p-5 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-l-4 border-purple-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-semibold text-purple-700">
                    Contract #{c.ContractID}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    c.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : c.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {c.status?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-600 font-semibold mb-1">CUSTOMER</p>
                    <p className="font-medium text-gray-900">
                      {c.customers?.name || `Customer #${c.CustomerID}`}
                    </p>
                  </div>

                  <div className="bg-pink-50 p-3 rounded-lg">
                    <p className="text-xs text-pink-600 font-semibold mb-1">FAMILIAR</p>
                    <p className="font-medium text-gray-900">
                      {c.familiars?.name || `Familiar #${c.FamiliarID}`}
                    </p>
                    {c.familiars?.species && (
                      <p className="text-xs text-gray-600 mt-1">
                        Species: {c.familiars.species}
                      </p>
                    )}
                  </div>

                  {c.familiars?.rarity && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-gray-600">Rarity:</span>
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        c.familiars.rarity === 'Legendary' ? 'bg-yellow-200 text-yellow-800' :
                        c.familiars.rarity === 'Mythic' ? 'bg-purple-200 text-purple-800' :
                        c.familiars.rarity === 'Epic' ? 'bg-blue-200 text-blue-800' :
                        c.familiars.rarity === 'Rare' ? 'bg-green-200 text-green-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {c.familiars.rarity}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Created: {new Date(c.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    {c.updated_at && c.updated_at !== c.created_at && (
                      <p className="text-xs text-gray-500 mt-1">
                        Updated: {new Date(c.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractPage;