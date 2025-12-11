import { Request, Response } from 'express';
import { customerQueries, contractQueries } from '../db/queries';

// Get all customers
export const getAllCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await customerQueries.findAll();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.CustomerID);
    const customer = await customerQueries.findById(id);
    res.status(200).json({ customer });
  } catch (error) {
    res.status(404).json({ error: 'Customer not found' });
  }
};

// Get customer's contracts
export const getCustomerContracts = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.CustomerID);
    const contracts = await contractQueries.findByCustomer(id);
    res.status(200).json({ contracts });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.CustomerID);
    const { name, GroupID, img } = req.body;

    // Check if customer exists first
    try {
      await customerQueries.findById(id);
    } catch (err) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Build update object with only provided fields
    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (GroupID !== undefined) updates.GroupID = GroupID;
    if (img !== undefined) updates.image = img;

    const customer = await customerQueries.update(id, updates);
    res.status(200).json({ message: 'Customer updated', customer });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.CustomerID);
    
    // Check if customer exists first
    try {
      await customerQueries.findById(id);
    } catch (err) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customerQueries.delete(id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};