// src/hooks/useContract.ts
import { useState, useEffect } from 'react';
import { api } from '../api/axiosClient';

interface Contract {
  ContractID: number;
  CustomerID: number;
  FamiliarID: number;
  status: string;
  created_at: string;
  updated_at: string;
  Customer?: any;
  Familiar?: any;
}

export function useContract() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchContracts() {
    try {
      setLoading(true);
      const res = await api.get('/api/contracts');
      setContracts(res.data);
      setLoading(false);
    } catch (err: any) {
      setError('Failed to fetch contracts');
      setLoading(false);
    }
  }

  async function createContract(customerId: number) {
    try {
      setLoading(true);
      const res = await api.post('/api/contracts', { customerId });
      await fetchContracts(); // refresh
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create contract');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContracts();
  }, []);

  return {
    contracts,
    loading,
    error,
    createContract,
    refresh: fetchContracts
  };
}
