import { Request, Response } from 'express';
import db from '../models/index.js';

const { Wizard, Contract, FamiliarGroup, Familiar } = db;

// Create a new wizard
export const createWizard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'name is required' });
      return;
    }

    const wizard = await Wizard.create({ name });

    res.status(201).json({ message: 'Wizard created', wizard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating wizard' });
  }
};

// Get all wizards
export const getAllWizards = async (_req: Request, res: Response): Promise<void> => {
  try {
    const wizards = await Wizard.findAll();
    res.status(200).json({ wizards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching wizards' });
  }
};

// Get wizard by ID
export const getWizardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const WizardID = Number(req.params.WizardID);
    
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    const wizard = await Wizard.findByPk(WizardID);

    if (!wizard) {
      res.status(404).json({ error: 'Wizard not found' });
      return;
    }

    res.status(200).json({ wizard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching wizard' });
  }
};

// Update wizard
export const updateWizard = async (req: Request, res: Response): Promise<void> => {
  try {
    const WizardID = Number(req.params.WizardID);
    const { name } = req.body;
    
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    const wizard = await Wizard.findByPk(WizardID);

    if (!wizard) {
      res.status(404).json({ error: 'Wizard not found' });
      return;
    }

    await wizard.update({
      ...(name && { name })
    });

    res.status(200).json({ message: 'Wizard updated', wizard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating wizard' });
  }
};

// Delete wizard
export const deleteWizard = async (req: Request, res: Response): Promise<void> => {
  try {
    const WizardID = Number(req.params.WizardID);
    
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    const wizard = await Wizard.findByPk(WizardID);

    if (!wizard) {
      res.status(404).json({ error: 'Wizard not found' });
      return;
    }

    await wizard.destroy();

    res.status(200).json({ message: 'Wizard deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting wizard' });
  }
};

// Get groups created by a wizard
export const getWizardGroups = async (req: Request, res: Response): Promise<void> => {
  try {
    const WizardID = Number(req.params.WizardID);
    
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    const groups = await FamiliarGroup.findAll({
      where: { WizardID }
    });

    res.status(200).json({ groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching wizard groups' });
  }
};

// Approve or reject a contract (wizard action)
export const reviewContract = async (req: Request, res: Response): Promise<void> => {
  try {
    const WizardID = Number(req.params.WizardID);
    const ContractID = Number(req.params.ContractID);
    const { action } = req.body; // 'accepted' | 'rejected'
    
    if (!WizardID || !ContractID || !action) {
      res.status(400).json({ error: 'WizardID, ContractID and action are required' });
      return;
    }

    if (action !== 'accepted' && action !== 'rejected') {
      res.status(400).json({ error: 'action must be "accepted" or "rejected"' });
      return;
    }

    // Find the contract
    const contract = await Contract.findByPk(ContractID);

    if (!contract) {
      res.status(404).json({ error: 'Contract not found' });
      return;
    }

    // Get the familiar to find its group
    const familiar = await Familiar.findByPk(contract.FamiliarID);

    if (!familiar) {
      res.status(404).json({ error: 'Familiar not found' });
      return;
    }

    // Get the group to verify wizard ownership
    const group = await FamiliarGroup.findByPk(familiar.GroupID);

    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    // Verify wizard owns the group
    if (group.WizardID !== WizardID) {
      res.status(403).json({ error: 'Wizard does not own this group' });
      return;
    }

    // Update contract status
    await contract.update({ status: action });

    res.status(200).json({ message: `Contract ${action}`, WizardID, ContractID, action });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reviewing contract' });
  }
};

// Get contracts for wizard's groups
export const getWizardContracts = async (req: Request, res: Response): Promise<void> => {
  try {
    const WizardID = Number(req.params.WizardID);
    
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    // Get all groups owned by this wizard
    const groups = await FamiliarGroup.findAll({
      where: { WizardID }
    });

    const groupIDs = groups.map(group => group.GroupID);

    if (groupIDs.length === 0) {
      res.status(200).json({ contracts: [] });
      return;
    }

    // Get all familiars in those groups
    const familiars = await Familiar.findAll({
      where: { GroupID: groupIDs }
    });

    const familiarIDs = familiars.map(familiar => familiar.FamiliarID);

    if (familiarIDs.length === 0) {
      res.status(200).json({ contracts: [] });
      return;
    }

    // Get all contracts for those familiars
    const contracts = await Contract.findAll({
      where: { FamiliarID: familiarIDs }
    });

    res.status(200).json({ contracts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching wizard contracts' });
  }
};