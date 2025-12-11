import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';

const ContractPage: React.FC = () => {
  const { contracts, loading, error, createContract } = useContract();
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!customerId) return;
    setSubmitting(true);
    try {
      const res = await createContract(Number(customerId));
      setMessage(res?.message || 'Action completed.');
      setCustomerId('');
    } catch (err) {
      setMessage('Error creating contract.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white/95 min-h-screen text-gray-900 space-y-6">

      {/* PAGE HEADER */}
      <h1 className="text-3xl font-extrabold text-purple-700 mb-6">Contracts</h1>

      {/* CREATE CONTRACT SECTION */}
      <div className="p-6 bg-white shadow-lg rounded-2xl max-w-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Create New Contract</h2>

        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full p-3 border border-purple-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleCreate}
          disabled={submitting}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Processing...' : 'Create Contract'}
        </button>

        {message && <p className="mt-3 text-green-700 font-medium">{message}</p>}
        {error && <p className="mt-3 text-red-600 font-medium">{error}</p>}
      </div>

      {/* CONTRACT LIST */}
      <div>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Existing Contracts</h2>

        {loading && <p className="text-purple-500 animate-pulse">Loading contracts...</p>}
        {!loading && contracts.length === 0 && <p className="text-gray-600">No contracts found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contracts.map((c) => (
            <div key={c.ContractID} className="p-4 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all">
              <p className="text-lg font-semibold mb-2">Contract #{c.ContractID}</p>
              <p><strong>Customer:</strong> {c.Customer?.name || c.CustomerID}</p>
              <p><strong>Familiar:</strong> {c.Familiar?.name || c.FamiliarID}</p>
              <p><strong>Status:</strong> {c.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
