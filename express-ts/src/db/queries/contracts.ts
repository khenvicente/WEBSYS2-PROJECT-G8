import { supabase } from '../supabase';
import { Contract } from '../types';

export const contractQueries = {
  async findAll() {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Contract[];
  },

  async findById(contractId: number) {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('ContractID', contractId)
      .single();
    
    if (error) throw error;
    return data as Contract;
  },

  async findByCustomer(customerId: number) {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('CustomerID', customerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Contract[];
  },

  async findByFamiliar(familiarId: number) {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('FamiliarID', familiarId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Contract[];
  },

  async findByStatus(status: string) {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Contract[];
  },

  async findWithDetails(contractId: number) {
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        customers (*),
        familiars (*)
      `)
      .eq('ContractID', contractId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async findAllWithDetails() {
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        customers (*),
        familiars (*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(contract: Omit<Contract, 'ContractID' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contracts')
      .insert(contract)
      .select()
      .single();
    
    if (error) throw error;
    return data as Contract;
  },

  async update(contractId: number, updates: Partial<Contract>) {
    const { data, error } = await supabase
      .from('contracts')
      .update(updates)
      .eq('ContractID', contractId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Contract;
  },

  async delete(contractId: number) {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('ContractID', contractId);
    
    if (error) throw error;
  }
};