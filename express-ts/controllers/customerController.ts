import { Request, Response } from 'express';
import { Customer, Contract } from '../types/index';

// Temporary in-memory store for quick testing — replace with DB/model calls.
const customers: Customer[] = [];
let nextCustomerID = 1;

// Create a new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, GroupID, email } = req.body;
    if (!name) {
      res.status(400).json({ error: 'name is required' });
      return;
    }

    // Replace with DB insert (Sequelize create) that returns the CustomerID
    const newCustomer: Customer = {
      CustomerID: nextCustomerID++,
      name,
      GroupID: GroupID ?? null,
      email: email ?? ''
    };
    customers.push(newCustomer);

    res.status(201).json({ message: 'Customer created', customer: newCustomer });
  } catch (error) {
    res.status(500).json({ error: 'Error creating customer' });
  }
};

// Get all customers
export const getAllCustomers = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: replace with DB query
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching customers' });
  }
};

// Get customer by ID
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);
    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    // TODO: replace with DB query (findByPk)
    const customer = customers.find(c => c.CustomerID === id) ?? null;
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching customer' });
  }
};

// Get customer's contracts
export const getCustomerContracts = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);
    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    // TODO: query contracts by CustomerID via DB/models
    const contracts: Contract[] = []; // placeholder
    res.status(200).json({ contracts });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contracts' });
  }
};

// Update customer
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);
    const { name, GroupID, email } = req.body;
    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    // TODO: replace with DB update (return updated row)
    const idx = customers.findIndex(c => c.CustomerID === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    customers[idx] = { ...customers[idx], name: name ?? customers[idx].name, GroupID: GroupID ?? customers[idx].GroupID, email: email ?? customers[idx].email };

    res.status(200).json({ message: 'Customer updated', customer: customers[idx] });
  } catch (error) {
    res.status(500).json({ error: 'Error updating customer' });
  }
};

// Delete customer
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);
    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    // TODO: replace with DB delete
    const idx = customers.findIndex(c => c.CustomerID === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    customers.splice(idx, 1);

    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting customer' });
  }
};