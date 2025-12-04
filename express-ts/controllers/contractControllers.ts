import { Request, Response } from 'express';
import { Customer, Familiar, FamiliarGroup, Contract } from '../types/index';

// Match customer to group
export const matchCustomerToGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { CustomerID, GroupID } = req.body;

    if (!CustomerID || !GroupID) {
      res.status(400).json({ error: 'CustomerID and GroupID are required' });
      return;
    }

    // TODO: Database logic - update Customer.GroupID
    res.status(200).json({ message: 'Customer matched to group successfully', CustomerID, GroupID });
  } catch (error) {
    res.status(500).json({ error: 'Error matching customer to group' });
  }
};

export const getFamiliarsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;

    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    // TODO: Fetch familiars from DB where Familiar.GroupID = GroupID
    res.status(200).json({ familiars: [] });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching familiars' });
  }
};

export const createContract = async (req: Request, res: Response): Promise<void> => {
  try {
    const { CustomerID, FamiliarID, GroupID } = req.body;

    if (!CustomerID || !FamiliarID || !GroupID) {
      res.status(400).json({ error: 'CustomerID, FamiliarID, and GroupID are required' });
      return;
    }

    // TODO: Create contract in DB with status 'pending'
    const newContract: Contract = {
      ContractID: 0, // DB will generate
      CustomerID,
      FamiliarID,
      status: 'pending',
      created_at: new Date()
    };

    res.status(201).json({ message: 'Contract created', contract: newContract });
  } catch (error) {
    res.status(500).json({ error: 'Error creating contract' });
  }
};

export const getContractStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ContractID } = req.params;

    if (!ContractID) {
      res.status(400).json({ error: 'ContractID is required' });
      return;
    }

    // TODO: Fetch contract from DB by ContractID
    res.status(200).json({ contract: {} });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contract' });
  }
};

export const getGroupPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;

    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    // TODO: Fetch group price from DB where Group.GroupID = GroupID
    res.status(200).json({ GroupID, price: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pricing' });
  }
};