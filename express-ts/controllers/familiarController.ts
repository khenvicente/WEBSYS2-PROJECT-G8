import { Request, Response } from 'express';
import { Familiar } from '../types/index';

// Create a new familiar
export const createFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, GroupID, species, size, color, pattern, personality, rarity, typing, typing2 } = req.body;

    if (!name || !GroupID) {
      res.status(400).json({ error: 'name and GroupID are required' });
      return;
    }

    const newFamiliar: Familiar = {
      FamiliarID: 0, // DB will generate
      GroupID,
      name,
      species: species || '',
      size: size || '',
      color: color || '',
      pattern: pattern || '',
      personality: personality || '',
      rarity: rarity || '',
      typing: typing || '',
      typing2: typing2 || null
    };

    // TODO: persist newFamiliar to DB
    res.status(201).json({ message: 'Familiar created', familiar: newFamiliar });
  } catch (err) {
    res.status(500).json({ error: 'Error creating familiar' });
  }
};

// Get all familiars
export const getAllFamiliars = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: fetch familiars from DB
    res.status(200).json({ familiars: [] });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching familiars' });
  }
};

// Get familiar by ID
export const getFamiliarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params;
    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' });
      return;
    }

    // TODO: fetch familiar by id from DB
    res.status(200).json({ familiar: null });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching familiar' });
  }
};

// Get familiars by group
export const getFamiliarsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    // TODO: fetch familiars for GroupID from DB where Familiar.GroupID = GroupID
    res.status(200).json({ familiars: [] });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching familiars by group' });
  }
};

// Update familiar
export const updateFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params;
    const { name, GroupID, species, size, color, pattern, personality, rarity, typing, typing2 } = req.body;

    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' });
      return;
    }

    // TODO: update familiar in DB
    res.status(200).json({ message: 'Familiar updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating familiar' });
  }
};

// Delete familiar
export const deleteFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params;
    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' });
      return;
    }

    // TODO: remove familiar from DB
    res.status(200).json({ message: 'Familiar deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting familiar' });
  }
};

// Utility: simulate whether a familiar accepts a contract
export const decideContract = (familiar: Familiar): boolean => {
  // Random decision based on familiar personality or other traits
  return Math.random() > 0.5;
};