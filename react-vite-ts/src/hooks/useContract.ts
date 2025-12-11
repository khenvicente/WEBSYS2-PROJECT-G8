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
  customers?: {
    CustomerID: number;
    name: string;
    email: string;
    image?: string;
  };
  familiars?: {
    FamiliarID: number;
    name: string;
    species?: string;
    image?: string;
    rarity?: string;
  };
}

export function useContract() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchContracts() {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/contracts'); 
      setContracts(res.data);
    } catch (err: any) {
      setError('Failed to fetch contracts');
    } finally {
      setLoading(false);
    }
  }

  async function createContract(customerId: number) {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/contracts', { customerId }); 
      await fetchContracts(); 
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to create contract';
      setError(msg);
      throw new Error(msg); 
    } finally {
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