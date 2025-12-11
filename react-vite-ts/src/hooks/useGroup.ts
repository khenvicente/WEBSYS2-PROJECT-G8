// hooks/useGroup.ts
import { useEffect, useState } from "react";
import { api } from "../api/axiosClient";

export interface Familiar {
  FamiliarID: number;
  GroupID?: number; 
  name: string;
  img?: string;
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

  species_type?: string;
  size_range?: string;
  color_theme?: string;
  pattern_type?: string;
  personality_type?: string;
  rarity_tier?: string;
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
      const res = await api.get("/api/familiars");
      setAllFamiliars(res.data);
    } catch (err: any) {
      console.error("Error fetching familiars:", err);
    }
  };

  // Fetch groups ONLY (no familiars inside them)
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/groups");
      setGroups(res.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching groups:", err);
      setError(err.response?.data?.error || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (payload: Partial<Group>) => {
    try {
      await api.post("/api/groups", payload);
      await fetchGroups();
    } catch (err: any) {
      console.error("Error creating group:", err);
      setError(err.response?.data?.error || err.message || "Unknown error");
      throw err;
    }
  };

  const updateGroup = async (GroupID: number, payload: Partial<Group>) => {
    try {
      await api.put(`/api/groups/${GroupID}`, payload);
      await fetchGroups();
    } catch (err: any) {
      console.error("Error updating group:", err);
      setError(err.response?.data?.error || err.message || "Unknown error");
      throw err;
    }
  };

  const deleteGroup = async (GroupID: number) => {
    try {
      await api.delete(`/api/groups/${GroupID}`);
      await fetchGroups();
    } catch (err: any) {
      console.error("Error deleting group:", err);
      setError(err.response?.data?.error || err.message || "Unknown error");
      throw err;
    }
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
  };
};
