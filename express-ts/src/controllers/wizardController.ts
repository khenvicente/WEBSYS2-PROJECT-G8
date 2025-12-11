import { Request, Response } from 'express';
import { wizardQueries, groupQueries, contractQueries } from '../db/queries';

// Get all wizards
export const getAllWizards = async (_req: Request, res: Response): Promise<void> => {
  try {
    const wizards = await wizardQueries.findAll();
    res.status(200).json({ wizards });
  } catch (err) {
    console.error(err);
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

    const wizard = await wizardQueries.findById(Number(WizardID));
    
    // Remove password from response
    const { password, ...safeWizard } = wizard;
    res.status(200).json({ wizard: safeWizard });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Wizard not found' });
  }
};

// Update wizard
export const updateWizard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID } = req.params;
    const updates = req.body;
    
    if (!WizardID) {
      res.status(400).json({ error: 'WizardID is required' });
      return;
    }

    // Check if wizard exists
    try {
      await wizardQueries.findById(Number(WizardID));
    } catch (err) {
      res.status(404).json({ error: 'Wizard not found' });
      return;
    }

    // Don't allow password updates through this endpoint
    delete updates.password;

    const updatedWizard = await wizardQueries.update(Number(WizardID), updates);
    
    // Remove password from response
    const { password, ...safeWizard } = updatedWizard;
    res.status(200).json({ message: 'Wizard updated', wizard: safeWizard });
  } catch (err) {
    console.error(err);
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

    // Check if wizard exists
    try {
      await wizardQueries.findById(Number(WizardID));
    } catch (err) {
      res.status(404).json({ error: 'Wizard not found' });
      return;
    }

    await wizardQueries.delete(Number(WizardID));
    res.status(200).json({ message: 'Wizard deleted' });
  } catch (err) {
    console.error(err);
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

    const groups = await groupQueries.findByWizard(Number(WizardID));
    res.status(200).json({ groups });
  } catch (err) {
    console.error(err);
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

    if (action !== 'accepted' && action !== 'rejected') {
      res.status(400).json({ error: 'Action must be "accepted" or "rejected"' });
      return;
    }

    // Get contract with details
    const contract = await contractQueries.findWithDetails(Number(ContractID));
    
    if (!contract) {
      res.status(404).json({ error: 'Contract not found' });
      return;
    }

    // Verify wizard owns the group (through familiar)
    const familiar = contract.familiars;
    if (!familiar || !familiar.GroupID) {
      res.status(400).json({ error: 'Familiar has no assigned group' });
      return;
    }

    const group = await groupQueries.findById(familiar.GroupID);
    if (group.WizardID !== Number(WizardID)) {
      res.status(403).json({ error: 'Wizard does not own this group' });
      return;
    }

    // Update contract status
    const updatedContract = await contractQueries.update(Number(ContractID), { status: action });
    res.status(200).json({ 
      message: `Contract ${action}`, 
      contract: updatedContract 
    });
  } catch (err) {
    console.error(err);
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

    // Get all groups owned by wizard
    const groups = await groupQueries.findByWizard(Number(WizardID));
    const groupIds = groups.map(g => g.GroupID);

    // Get all contracts with details
    const allContracts = await contractQueries.findAllWithDetails();
    
    // Filter contracts where familiar belongs to wizard's groups
    const wizardContracts = allContracts.filter(contract => {
      return contract.familiars && 
             contract.familiars.GroupID && 
             groupIds.includes(contract.familiars.GroupID);
    });

    res.status(200).json({ contracts: wizardContracts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching wizard contracts' });
  }
};