import { useState, useEffect } from 'react';
import { api } from '../api/axiosClient';

export interface Customer {
  CustomerID: number;
  name: string;
  GroupID?: number;
  image?: string;
}

export function useCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/customers');
      setCustomers(res.data.customers);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customer: { name: string; GroupID?: number; image?: string }) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/customers', customer);
      await fetchCustomers();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (CustomerID: number, customer: { name?: string; GroupID?: number; image?: string }) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/api/customers/${CustomerID}`, customer);
      await fetchCustomers();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (CustomerID: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/customers/${CustomerID}`);
      await fetchCustomers();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
  };
}
