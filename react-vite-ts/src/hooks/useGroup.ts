// hooks/useGroup.ts
import { useEffect, useState } from "react";
import { api } from "../api/axiosClient";

export interface Familiar {
  FamiliarID: number;
  GroupID?: number; 
  name: string;
  image?: string;
  species?: string;
  size?: string;
  color?: string;
  pattern?: string;
  personality?: string;
  rarity?: string;
  typing?: string[];
}

export interface Group {
  GroupID: number;
  WizardID?: number;
  price: number;
  species?: string; 
  size?: string; 
  color?: string; 
  pattern?: string; 
  personality?: string; 
  rarity?: string; 
  typing?: any;
}

export const useGroup = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [allFamiliars, setAllFamiliars] = useState<Familiar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ALL familiars independently
  const fetchFamiliars = async () => {
    try {
      const res = await api.get("/familiars");
      setAllFamiliars(res.data);
    } catch (err: any) {
      console.error("Error fetching familiars:", err);
    }
  };

  // Fetch groups ONLY (no familiars inside them)
  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/groups"); 
      setGroups(res.data);
    } catch (err: any) {
      console.error("Error fetching groups:", err);
      setError(err.response?.data?.error || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (payload: Partial<Group>) => {
    try {
      setError(null);
      await api.post("/groups", payload); 
      await fetchGroups();
    } catch (err: any) {
      console.error("Error creating group:", err);
      const msg = err.response?.data?.error || err.message || "Unknown error";
      setError(msg);
      throw err;
    }
  };

  const updateGroup = async (GroupID: number, payload: Partial<Group>) => {
    try {
      setError(null);
      await api.put(`/groups/${GroupID}`, payload); 
      await fetchGroups();
    } catch (err: any) {
      console.error("Error updating group:", err);
      const msg = err.response?.data?.error || err.message || "Unknown error";
      setError(msg);
      throw err;
    }
  };

  const deleteGroup = async (GroupID: number) => {
    try {
      setError(null);
      await api.delete(`/groups/${GroupID}`); 
      await fetchGroups();
    } catch (err: any) {
      console.error("Error deleting group:", err);
      const msg = err.response?.data?.error || err.message || "Unknown error";
      setError(msg);
      throw err;
    }
  };

  // Helper function to get familiars for a specific group
  const getFamiliarsByGroup = (groupId: number) => {
    return allFamiliars.filter(f => f.GroupID === groupId);
  };

  useEffect(() => {
    fetchGroups();
    fetchFamiliars();
  }, []);

  return {
    groups,
    familiars: allFamiliars,
    loading,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
    getFamiliarsByGroup,
    refresh: () => {
      fetchGroups();
      fetchFamiliars();
    }
  };
};