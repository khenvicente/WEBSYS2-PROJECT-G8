import { supabase } from '../supabase';
import { Wizard } from '../types';

export const wizardQueries = {
  async findAll() {
    const { data, error } = await supabase
      .from('wizards')
      .select('*');
    
    if (error) throw error;
    return data as Wizard[];
  },

  async findById(wizardId: number) {
    const { data, error } = await supabase
      .from('wizards')
      .select('*')
      .eq('WizardID', wizardId)
      .single();
    
    if (error) throw error;
    return data as Wizard;
  },

  async findByEmail(email: string) {
    const { data, error } = await supabase
      .from('wizards')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data as Wizard;
  },

  async findByUsername(username: string) {
    const { data, error } = await supabase
      .from('wizards')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) throw error;
    return data as Wizard;
  },

  async create(wizard: Omit<Wizard, 'WizardID'>) {
    const { data, error } = await supabase
      .from('wizards')
      .insert(wizard)
      .select()
      .single();
    
    if (error) throw error;
    return data as Wizard;
  },

  async update(wizardId: number, updates: Partial<Wizard>) {
    const { data, error } = await supabase
      .from('wizards')
      .update(updates)
      .eq('WizardID', wizardId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Wizard;
  },

  async delete(wizardId: number) {
    const { error } = await supabase
      .from('wizards')
      .delete()
      .eq('WizardID', wizardId);
    
    if (error) throw error;
  }
};