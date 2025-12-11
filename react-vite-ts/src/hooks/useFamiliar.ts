import { useState, useEffect } from 'react';
import { api } from '../api/axiosClient';

export interface Familiar {  
  FamiliarID: number;
  GroupID?: number;
  image?: string;
  name: string;
  species?: string;
  size?: string;
  color?: string;
  pattern?: string;
  personality?: string;
  rarity?: string;
  typing?: any;
}

export function useFamiliar() {
  const [familiars, setFamiliars] = useState<Familiar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchFamiliars() {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/familiars');
      setFamiliars(res.data);
    } catch (err: any) {
      setError('Failed to fetch familiars');
    } finally {
      setLoading(false);
    }
  }

  async function fetchFamiliarById(id: number) {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/familiars/${id}`);
      return res.data;
    } catch (err: any) {
      setError('Failed to fetch familiar');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createFamiliar(data: Omit<Familiar, 'FamiliarID'>) {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/familiars', data);
      await fetchFamiliars();
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to create familiar';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function updateFamiliar(id: number, data: Partial<Familiar>) {
    try {
      setLoading(true);
      setError(null);
      const res = await api.put(`/familiars/${id}`, data);
      await fetchFamiliars();
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to update familiar';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFamiliar(id: number) {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/familiars/${id}`);
      await fetchFamiliars();
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to delete familiar';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFamiliarsByGroup(groupId: number) {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/familiars/group/${groupId}`);
      return res.data;
    } catch (err: any) {
      setError('Failed to fetch familiars by group');
      return [];
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFamiliars();
  }, []);

  return {
    familiars,
    loading,
    error,
    fetchFamiliarById,
    createFamiliar,
    updateFamiliar,
    deleteFamiliar,
    fetchFamiliarsByGroup,
    refresh: fetchFamiliars
  };
}