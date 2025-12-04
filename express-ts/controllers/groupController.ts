import { Request, Response } from 'express';
import db from '../models/index.js';

const { FamiliarGroup, Familiar } = db;

// Create a new familiar group
export const createGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { WizardID, price, species_type, size_range, color_theme, pattern_type, personality_type, rarity_tier, primary_typing, secondary_typing } = req.body;
    
    if (!WizardID || price == null) {
      res.status(400).json({ error: 'WizardID and price are required' });
      return;
    }

    const group = await FamiliarGroup.create({
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
    });

    res.status(201).json({ message: 'Group created', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating group' });
  }
};

// Get all groups
export const getAllGroups = async (_req: Request, res: Response): Promise<void> => {
  try {
    const groups = await FamiliarGroup.findAll();
    res.status(200).json({ groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching groups' });
  }
};

// Get group by ID
export const getGroupById = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);
    
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    const group = await FamiliarGroup.findByPk(GroupID);

    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    res.status(200).json({ group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching group' });
  }
};

// Update group
export const updateGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);
    const { price, species_type, size_range, color_theme, pattern_type, personality_type, rarity_tier, primary_typing, secondary_typing } = req.body;
    
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    const group = await FamiliarGroup.findByPk(GroupID);

    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    await group.update({
      ...(price !== undefined && { price: Number(price) }),
      ...(species_type !== undefined && { species_type }),
      ...(size_range !== undefined && { size_range }),
      ...(color_theme !== undefined && { color_theme }),
      ...(pattern_type !== undefined && { pattern_type }),
      ...(personality_type !== undefined && { personality_type }),
      ...(rarity_tier !== undefined && { rarity_tier }),
      ...(primary_typing !== undefined && { primary_typing }),
      ...(secondary_typing !== undefined && { secondary_typing })
    });

    res.status(200).json({ message: 'Group updated', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating group' });
  }
};

// Delete group
export const deleteGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);
    
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    const group = await FamiliarGroup.findByPk(GroupID);

    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    await group.destroy();

    res.status(200).json({ message: 'Group deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting group' });
  }
};

// Get pricing for a group
export const getGroupPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);
    
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    const group = await FamiliarGroup.findByPk(GroupID);

    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    res.status(200).json({ GroupID, price: group.price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching pricing' });
  }
};

// Add a familiar to a group
export const addFamiliarToGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);
    const { FamiliarID } = req.body;
    
    if (!GroupID || !FamiliarID) {
      res.status(400).json({ error: 'GroupID and FamiliarID are required' });
      return;
    }

    const familiar = await Familiar.findByPk(FamiliarID);

    if (!familiar) {
      res.status(404).json({ error: 'Familiar not found' });
      return;
    }

    await familiar.update({ GroupID });

    res.status(200).json({ message: 'Familiar added to group', GroupID, FamiliarID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding familiar to group' });
  }
};

// Remove a familiar from a group
export const removeFamiliarFromGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);
    const { FamiliarID } = req.body;
    
    if (!GroupID || !FamiliarID) {
      res.status(400).json({ error: 'GroupID and FamiliarID are required' });
      return;
    }

    const familiar = await Familiar.findByPk(FamiliarID);

    if (!familiar) {
      res.status(404).json({ error: 'Familiar not found' });
      return;
    }

    // Verify the familiar is in this group before removing
    if (familiar.GroupID !== GroupID) {
      res.status(400).json({ error: 'Familiar is not in this group' });
      return;
    }

    await familiar.update({ GroupID: null });

    res.status(200).json({ message: 'Familiar removed from group', GroupID, FamiliarID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error removing familiar from group' });
  }
};