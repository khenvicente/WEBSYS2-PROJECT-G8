import { Request, Response } from 'express';
import db from '../models/index.js';

const { Familiar } = db;

// Create a new familiar
export const createFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, GroupID, species, size, color, pattern, personality, rarity, typing, typing2 } = req.body;

    if (!name || !GroupID) {
      res.status(400).json({ error: 'name and GroupID are required' });
      return;
    }

    const familiar = await Familiar.create({
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
    });

    res.status(201).json({ message: 'Familiar created', familiar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating familiar' });
  }
};

// Get all familiars
export const getAllFamiliars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const familiars = await Familiar.findAll();
    res.status(200).json({ familiars });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching familiars' });
  }
};

// Get familiar by ID
export const getFamiliarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const FamiliarID = Number(req.params.FamiliarID);
    
    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' });
      return;
    }

    const familiar = await Familiar.findByPk(FamiliarID);

    if (!familiar) {
      res.status(404).json({ error: 'Familiar not found' });
      return;
    }

    res.status(200).json({ familiar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching familiar' });
  }
};

// Get familiars by group
export const getFamiliarsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const GroupID = Number(req.params.GroupID);
    
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' });
      return;
    }

    const familiars = await Familiar.findAll({
      where: { GroupID }
    });

    res.status(200).json({ familiars });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching familiars by group' });
  }
};

// Update familiar
export const updateFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const FamiliarID = Number(req.params.FamiliarID);
    const { name, GroupID, species, size, color, pattern, personality, rarity, typing, typing2 } = req.body;

    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' });
      return;
    }

    const familiar = await Familiar.findByPk(FamiliarID);

    if (!familiar) {
      res.status(404).json({ error: 'Familiar not found' });
      return;
    }

    await familiar.update({
      ...(name && { name }),
      ...(GroupID !== undefined && { GroupID }),
      ...(species !== undefined && { species }),
      ...(size !== undefined && { size }),
      ...(color !== undefined && { color }),
      ...(pattern !== undefined && { pattern }),
      ...(personality !== undefined && { personality }),
      ...(rarity !== undefined && { rarity }),
      ...(typing !== undefined && { typing }),
      ...(typing2 !== undefined && { typing2 })
    });

    res.status(200).json({ message: 'Familiar updated', familiar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating familiar' });
  }
};

// Delete familiar
export const deleteFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const FamiliarID = Number(req.params.FamiliarID);
    
    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' });
      return;
    }

    const familiar = await Familiar.findByPk(FamiliarID);

    if (!familiar) {
      res.status(404).json({ error: 'Familiar not found' });
      return;
    }

    await familiar.destroy();

    res.status(200).json({ message: 'Familiar deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting familiar' });
  }
};

// decide contract function
export const decideContract = (familiar: any): boolean => {
  // Random decision based on familiar personality or other traits
  return Math.random() > 0.5;
};