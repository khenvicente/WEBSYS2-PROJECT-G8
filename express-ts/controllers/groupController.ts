import { Request, Response } from 'express';
import { FamiliarGroup, Familiar } from '../types/index';

// Create a new familiar group
export const createGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID, price, species_type, size_range, color_theme, pattern_type, personality_type, rarity_tier, primary_typing, secondary_typing } = req.body;
    
    if (!WizardID || price == null) {
      res.status(400).json({ error: 'WizardID and price are required' });
      return;
    }

    const newGroup: FamiliarGroup = {
      GroupID: 0, // DB will generate
      WizardID,
      price: Number(price),
      species_type: species_type || '',
      size_range: size_range || '',
      color_theme: color_theme || '',
      pattern_type: pattern_type || '',
      personality_type: personality_type || '',
      rarity_tier: rarity_tier || '',
      primary_typing: primary_typing || '',
      secondary_typing: secondary_typing || null
    };

    // TODO: persist newGroup to DB
    res.status(201).json({ message: 'Group created', group: newGroup });
  } catch (err) {
    res.status(500).json({ error: 'Error creating group' });
  }
};

// Get all groups
export const getAllGroups = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: fetch groups from DB
    res.status(200).json({ groups: [] });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching groups' });
  }
};

// Get group by ID
export const getGroupById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    // TODO: fetch group by id from DB
    res.status(200).json({ group: null });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching group' });
  }
};

// Update group
export const updateGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;
    const { price, species_type, size_range, color_theme, pattern_type, personality_type, rarity_tier, primary_typing, secondary_typing } = req.body;
    
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    // TODO: update group in DB
    res.status(200).json({ message: 'Group updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating group' });
  }
};

// Delete group
export const deleteGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    // TODO: delete group from DB
    res.status(200).json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting group' });
  }
};

// Get pricing for a group
export const getGroupPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    // TODO: lookup group pricing from DB
    res.status(200).json({ GroupID, price: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching pricing' });
  }
};

// Add a familiar to a group
export const addFamiliarToGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;
    const { FamiliarID } = req.body;
    if (!GroupID || !FamiliarID) {
      res.status(400).json({ error: 'GroupID and FamiliarID are required' });
      return;
    }

    // TODO: update Familiar.GroupID in DB
    res.status(200).json({ message: 'Familiar added to group', GroupID, FamiliarID });
  } catch (err) {
    res.status(500).json({ error: 'Error adding familiar to group' });
  }
};

// Remove a familiar from a group
export const removeFamiliarFromGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params;
    const { FamiliarID } = req.body;
    if (!GroupID || !FamiliarID) {
      res.status(400).json({ error: 'GroupID and FamiliarID are required' });
      return;
    }

    // TODO: clear Familiar.GroupID in DB
    res.status(200).json({ message: 'Familiar removed from group', GroupID, FamiliarID });
  } catch (err) {
    res.status(500).json({ error: 'Error removing familiar from group' });
  }
};