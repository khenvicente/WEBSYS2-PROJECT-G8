import { useState, useEffect } from 'react';
import { api } from '../api/axiosClient';

interface Customer {
  CustomerID: number;
  GroupID?: number;
  name: string;
  image?: string;
  email: string;
  username: string;
  role: string;
}

export function useCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCustomers() {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/customers');
      setCustomers(res.data.customers);
    } catch (err: any) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  }

  async function fetchCustomerById(id: number) {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/customers/${id}`);
      return res.data.customer;
    } catch (err: any) {
      setError('Failed to fetch customer');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateCustomer(id: number, data: Partial<Customer>) {
    try {
      setLoading(true);
      setError(null);
      const res = await api.put(`/customers/${id}`, data);
      await fetchCustomers(); 
      return res.data.customer;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to update customer';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCustomer(id: number) {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/customers/${id}`);
      await fetchCustomers(); 
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to delete customer';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    fetchCustomerById,
    updateCustomer,
    deleteCustomer,
    refresh: fetchCustomers
  };
}