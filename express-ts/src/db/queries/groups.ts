import { supabase } from '../supabase';
import { Group } from '../types';

export const groupQueries = {
  async findAll() {
    const { data, error } = await supabase
      .from('groups')
      .select('*');
    
    if (error) throw error;
    return data as Group[];
  },

  async findById(groupId: number) {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('GroupID', groupId)
      .single();
    
    if (error) throw error;
    return data as Group;
  },

  async findByWizard(wizardId: number) {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('WizardID', wizardId);
    
    if (error) throw error;
    return data as Group[];
  },

  async findWithWizard(groupId: number) {
    const { data, error } = await supabase
      .from('groups')
      .select(`
        *,
        wizards (*)
      `)
      .eq('GroupID', groupId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(group: Omit<Group, 'GroupID'>) {
    const { data, error } = await supabase
      .from('groups')
      .insert(group)
      .select()
      .single();
    
    if (error) throw error;
    return data as Group;
  },

  async update(groupId: number, updates: Partial<Group>) {
    const { data, error } = await supabase
      .from('groups')
      .update(updates)
      .eq('GroupID', groupId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Group;
  },

  async delete(groupId: number) {
    const { error } = await supabase
      .from('groups')
      .delete()
      .eq('GroupID', groupId);
    
    if (error) throw error;
  }
};