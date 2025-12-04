import { Request, Response } from 'express';
import db from '../models/index.js';

const { Customer } = db;

// ----------------------------------------------
// CREATE CUSTOMER
// ----------------------------------------------
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, GroupID } = req.body;

    if (!name) {
      res.status(400).json({ error: 'name is required' });
      return;
    }

    const customer = await Customer.create({
      name,
      GroupID: GroupID ?? null
    });

    res.status(201).json({
      message: 'Customer created',
      customer
    });

  } catch (error) {
    res.status(500).json({ error: 'Error creating customer' });
  }
};

// ----------------------------------------------
// GET ALL CUSTOMERS
// ----------------------------------------------
export const getAllCustomers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ customers });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching customers' });
  }
};

// ----------------------------------------------
// GET CUSTOMER BY ID
// ----------------------------------------------
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);

    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    res.status(200).json({ customer });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching customer' });
  }
};

// ----------------------------------------------
// GET CUSTOMER CONTRACTS
// ----------------------------------------------
export const getCustomerContracts = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);

    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    // If you have Contract model and associations set up:
    const { Contract } = db;
    const contracts = await Contract.findAll({
      where: { CustomerID: id }
    });

    res.status(200).json({ contracts });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching contracts' });
  }
};

// ----------------------------------------------
// UPDATE CUSTOMER
// ----------------------------------------------
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);
    const { name, GroupID } = req.body;

    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    await customer.update({
      ...(name && { name }),
      ...(GroupID !== undefined && { GroupID })
    });

    res.status(200).json({
      message: 'Customer updated',
      customer
    });

  } catch (error) {
    res.status(500).json({ error: 'Error updating customer' });
  }
};

// ----------------------------------------------
// DELETE CUSTOMER
// ----------------------------------------------
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.customerId);

    if (!id) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    await customer.destroy();

    res.status(200).json({ message: 'Customer deleted' });

  } catch (error) {
    res.status(500).json({ error: 'Error deleting customer' });
  }
};