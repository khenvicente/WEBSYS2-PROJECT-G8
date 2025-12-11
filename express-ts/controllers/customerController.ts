import { Request, Response } from 'express';
import { Customer, Contract } from '../models';

// Get all customers
export const getAllCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.CustomerID);
    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get customer's contracts
export const getCustomerContracts = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.CustomerID);
    const contracts = await Contract.findAll({ where: { CustomerID: id } });
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

    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    await customer.update({ name: name ?? customer.name, GroupID: GroupID ?? customer.GroupID, image: img ?? customer.image });
    res.status(200).json({ message: 'Customer updated', customer });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.CustomerID);
    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    await customer.destroy();
    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
