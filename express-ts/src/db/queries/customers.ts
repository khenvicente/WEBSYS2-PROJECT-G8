import { supabase } from '../supabase';
import { Customer } from '../types';

export const customerQueries = {
  async findAll() {
    const { data, error } = await supabase
      .from('customers')
      .select('*');
    
    if (error) throw error;
    return data as Customer[];
  },

  async findById(customerId: number) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('CustomerID', customerId)
      .single();
    
    if (error) throw error;
    return data as Customer;
  },

  async findByEmail(email: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data as Customer;
  },

  async findByUsername(username: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) throw error;
    return data as Customer;
  },

  async findByGroup(groupId: number) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('GroupID', groupId);
    
    if (error) throw error;
    return data as Customer[];
  },

  async findWithGroup(customerId: number) {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *,
        groups (*)
      `)
      .eq('CustomerID', customerId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(customer: Omit<Customer, 'CustomerID'>) {
    const { data, error } = await supabase
      .from('customers')
      .insert(customer)
      .select()
      .single();
    
    if (error) throw error;
    return data as Customer;
  },

  async update(customerId: number, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('CustomerID', customerId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Customer;
  },

  async delete(customerId: number) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('CustomerID', customerId);
    
    if (error) throw error;
  }
};