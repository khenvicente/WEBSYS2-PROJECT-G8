import { supabase } from '../supabase';
import { Familiar } from '../types';

export const familiarQueries = {
  async findAll() {
    const { data, error } = await supabase
      .from('familiars')
      .select('*');
    
    if (error) throw error;
    return data as Familiar[];
  },

  async findById(familiarId: number) {
    const { data, error } = await supabase
      .from('familiars')
      .select('*')
      .eq('FamiliarID', familiarId)
      .single();
    
    if (error) throw error;
    return data as Familiar;
  },

  async findByGroup(groupId: number) {
    const { data, error } = await supabase
      .from('familiars')
      .select('*')
      .eq('GroupID', groupId);
    
    if (error) throw error;
    return data as Familiar[];
  },

  async findWithGroup(familiarId: number) {
    const { data, error } = await supabase
      .from('familiars')
      .select(`
        *,
        groups (*)
      `)
      .eq('FamiliarID', familiarId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(familiar: Omit<Familiar, 'FamiliarID'>) {
    const { data, error } = await supabase
      .from('familiars')
      .insert(familiar)
      .select()
      .single();
    
    if (error) throw error;
    return data as Familiar;
  },

  async update(familiarId: number, updates: Partial<Familiar>) {
    const { data, error } = await supabase
      .from('familiars')
      .update(updates)
      .eq('FamiliarID', familiarId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Familiar;
  },

  async delete(familiarId: number) {
    const { error } = await supabase
      .from('familiars')
      .delete()
      .eq('FamiliarID', familiarId);
    
    if (error) throw error;
  }
};