import React, { useEffect, useState } from 'react';
import { useContract } from '../hooks/useContract';
import { useCustomer } from '../hooks/useCustomer';
import { useFamiliar } from '../hooks/useFamiliar';
import { useGroup } from '../hooks/useGroup';

export default function Dashboard() {
  const { contracts } = useContract();
  const { customers } = useCustomer();
  const { familiars } = useFamiliar();
  const { groups } = useGroup();
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Calculate statistics
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const pendingContracts = contracts.filter(c => c.status === 'pending').length;
  const customersWithGroups = customers.filter(c => c.GroupID !== null).length;
  const availableFamiliars = familiars.filter(f => {
    // Check if familiar doesn't have an active contract
    return !contracts.some(c => c.FamiliarID === f.FamiliarID && c.status === 'active');
  }).length;

  // Recent contracts (last 5)
  const recentContracts = [...contracts]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Popular familiar types
  const familiarsByRarity = familiars.reduce((acc: any, f) => {
    const rarity = f.rarity || 'Common';
    acc[rarity] = (acc[rarity] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      
      {/* WELCOME HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-purple-900 mb-2">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your familiar marketplace today.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Contracts */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Contracts</p>
              <p className="text-3xl font-bold text-purple-700">{contracts.length}</p>
              <p className="text-xs text-green-600 mt-2">
                ✓ {activeContracts} active
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <span className="text-3xl">📜</span>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Customers</p>
              <p className="text-3xl font-bold text-blue-700">{customers.length}</p>
              <p className="text-xs text-green-600 mt-2">
                {customersWithGroups} with groups
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <span className="text-3xl">👥</span>
            </div>
          </div>
        </div>

        {/* Total Familiars */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Familiars</p>
              <p className="text-3xl font-bold text-pink-700">{familiars.length}</p>
              <p className="text-xs text-green-600 mt-2">
                {availableFamiliars} available
              </p>
            </div>
            <div className="bg-pink-100 p-4 rounded-full">
              <span className="text-3xl">🐉</span>
            </div>
          </div>
        </div>

        {/* Total Groups */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Groups</p>
              <p className="text-3xl font-bold text-orange-700">{groups.length}</p>
              <p className="text-xs text-gray-500 mt-2">
                Active collections
              </p>
            </div>
            <div className="bg-orange-100 p-4 rounded-full">
              <span className="text-3xl">📦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* RECENT CONTRACTS */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <span>📋</span> Recent Contracts
          </h2>
          
          {recentContracts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No contracts yet</p>
          ) : (
            <div className="space-y-3">
              {recentContracts.map((contract) => (
                <div 
                  key={contract.ContractID}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {contract.customers?.name || `Customer #${contract.CustomerID}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      with {contract.familiars?.name || `Familiar #${contract.FamiliarID}`}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    contract.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : contract.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {contract.status?.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAMILIAR RARITY DISTRIBUTION */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <span>✨</span> Familiar Rarity
          </h2>
          
          <div className="space-y-4">
            {Object.entries(familiarsByRarity).map(([rarity, count]: [string, any]) => {
              const percentage = (count / familiars.length) * 100;
              const colors: any = {
                'Legendary': 'bg-yellow-500',
                'Mythic': 'bg-purple-500',
                'Epic': 'bg-blue-500',
                'Rare': 'bg-green-500',
                'Common': 'bg-gray-500'
              };
              
              return (
                <div key={rarity}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{rarity}</span>
                    <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${colors[rarity] || 'bg-gray-400'} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTRACT STATUS OVERVIEW */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <span>📊</span> Contract Status Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">Active</p>
                <p className="text-2xl font-bold text-green-700">{activeContracts}</p>
              </div>
              <span className="text-4xl">✅</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">{pendingContracts}</p>
              </div>
              <span className="text-4xl">⏳</span>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-700">
                  {contracts.filter(c => c.status === 'rejected').length}
                </p>
              </div>
              <span className="text-4xl">❌</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}