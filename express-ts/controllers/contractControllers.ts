import { Request, Response } from 'express';
import db from '../models/index.js';

const { Customer, Familiar, FamiliarGroup, Contract } = db;

// ----------------------------------------------
// MATCH CUSTOMER TO GROUP
// ----------------------------------------------
export const matchCustomerToGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { CustomerID, GroupID } = req.body;

    if (!Number.isInteger(CustomerID) || CustomerID <= 0 || !Number.isInteger(GroupID) || GroupID <= 0) {
      res.status(400).json({ error: 'Valid CustomerID and GroupID are required' });
      return;
    }

    const customer = await Customer.findByPk(CustomerID);

    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    await customer.update({ GroupID });

    res.status(200).json({ message: 'Customer matched to group successfully', CustomerID, GroupID });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error matching customer to group' });
  }
};

// ----------------------------------------------
// GET FAMILIARS BY GROUP
// ----------------------------------------------
export const getFamiliarsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);

    if (!Number.isInteger(GroupID) || GroupID <= 0) {
      res.status(400).json({ error: 'Valid GroupID is required' });
      return;
    }

    const familiars = await Familiar.findAll({
      where: { GroupID }
    });

    res.status(200).json({ familiars });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching familiars' });
  }
};

// ----------------------------------------------
// CREATE CONTRACT
// ----------------------------------------------
export const createContract = async (req: Request, res: Response): Promise<void> => {
  try {
    const { CustomerID, FamiliarID } = req.body;

    if (!Number.isInteger(CustomerID) || CustomerID <= 0 ||
        !Number.isInteger(FamiliarID) || FamiliarID <= 0) {
      res.status(400).json({ error: 'Valid CustomerID and FamiliarID are required' });
      return;
    }

    const contract = await Contract.create({
      CustomerID,
      FamiliarID,
      status: 'pending',
      created_at: new Date()
    });

    res.status(201).json({ message: 'Contract created', contract });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating contract' });
  }
};

// ----------------------------------------------
// GET CONTRACT STATUS
// ----------------------------------------------
export const getContractStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const ContractID = Number(req.params.ContractID);

    if (!Number.isInteger(ContractID) || ContractID <= 0) {
      res.status(400).json({ error: 'Valid ContractID is required' });
      return;
    }

    const contract = await Contract.findByPk(ContractID);

    if (!contract) {
      res.status(404).json({ error: 'Contract not found' });
      return;
    }

    res.status(200).json({ contract });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching contract' });
  }
};

// ----------------------------------------------
// GET GROUP PRICING
// ----------------------------------------------
export const getGroupPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);

    if (!Number.isInteger(GroupID) || GroupID <= 0) {
      res.status(400).json({ error: 'Valid GroupID is required' });
      return;
    }

    const group = await FamiliarGroup.findByPk(GroupID);

    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    res.status(200).json({ GroupID, price: group.price });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching pricing' });
  }
};