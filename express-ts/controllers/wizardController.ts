import { Request, Response } from 'express';
import { Wizard, Contract } from '../types/index';

// Get all wizards
export const getAllWizards = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: fetch wizards from DB
    res.status(200).json({ wizards: [] });
  } catch {
    res.status(500).json({ error: 'Error fetching wizards' });
  }
};

// Get wizard by ID
export const getWizardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID } = req.params;
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    // TODO: fetch wizard by id from DB
    res.status(200).json({ wizard: null });
  } catch {
    res.status(500).json({ error: 'Error fetching wizard' });
  }
};

// Update wizard
export const updateWizard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID } = req.params;
    const { name } = req.body;
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    // TODO: update wizard in DB
    res.status(200).json({ message: 'Wizard updated' });
  } catch {
    res.status(500).json({ error: 'Error updating wizard' });
  }
};

// Delete wizard
export const deleteWizard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID } = req.params;
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    // TODO: delete wizard from DB
    res.status(200).json({ message: 'Wizard deleted' });
  } catch {
    res.status(500).json({ error: 'Error deleting wizard' });
  }
};

// Get groups created by a wizard
export const getWizardGroups = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID } = req.params;
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    // TODO: fetch groups from DB where Group.WizardID = WizardID
    res.status(200).json({ groups: [] });
  } catch {
    res.status(500).json({ error: 'Error fetching wizard groups' });
  }
};

// Approve or reject a contract (wizard action)
export const reviewContract = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID, ContractID } = req.params;
    const { action } = req.body; // 'accepted' | 'rejected'
    if (!WizardID || !ContractID || !action) {
      res.status(400).json({ error: 'WizardID, ContractID and action are required' });
      return;
    }

    // TODO: verify wizard owns the group, update contract status in DB
    res.status(200).json({ message: `Contract ${action}`, WizardID, ContractID, action });
  } catch {
    res.status(500).json({ error: 'Error reviewing contract' });
  }
};

// Get contracts for wizard's groups
export const getWizardContracts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID } = req.params;
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    // TODO: fetch contracts where wizard owns the group
    res.status(200).json({ contracts: [] });
  } catch {
    res.status(500).json({ error: 'Error fetching wizard contracts' });
  }
};