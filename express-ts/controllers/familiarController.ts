import { Request, Response } from 'express'
import { Familiar } from '../types/index'
import db from "../models"

export const createFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Familiar } = db
    const {
      name,
      img,
      species,
      size,
      color,
      pattern,
      personality,
      rarity,
      typing,
    } = req.body

    // Required fields
    if (!name) {
      res.status(400).json({ error: "Name is required" })
      return
    }

    // Ensure typing is always an array
    const normalizedTyping = Array.isArray(typing)
      ? typing
      : typeof typing === "string" && typing.length > 0
        ? typing.split(",").map((t) => t.trim())
        : []

    // Insert into DB
    const newFamiliar = await Familiar.create({
      name,
      img: img || null,
      species: species || null,
      size: size || null,
      color: color || null,
      pattern: pattern || null,
      personality: personality || null,
      rarity: rarity || null,
      typing: normalizedTyping || null,
    })

    res.status(201).json(newFamiliar)
  } catch (err) {
    console.error("Error creating familiar:", err)
    res.status(500).json({ error: "Error creating familiar" })
  }
}

// Get all familiars
export const getAllFamiliars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await db.Familiar.findAll()
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching familiars' })
  }
}

// Get familiar by ID
export const getFamiliarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    const response = await db.Familiar.findByPk(FamiliarID)
    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' })
      return
    }
    res.status(200).json(response)
    res.status(200).json({ familiar: null })
  } catch (err) {
    res.status(500).json({ error: 'Error fetching familiar' })
  }
}

// Get familiars by group
export const getFamiliarsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params
    if (!GroupID) {
      res.status(400).json({ error: 'GroupID is required' })
      return
    }

    // TODO: fetch familiars for GroupID from DB where Familiar.GroupID = GroupID
    res.status(200).json({ familiars: [] })
  } catch (err) {
    res.status(500).json({ error: 'Error fetching familiars by group' })
  }
}

// Update familiar
export const updateFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    const { name, GroupID, species, size, color, pattern, personality, rarity, typing, typing2 } = req.body

    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' })
      return
    }

    // TODO: update familiar in DB
    res.status(200).json({ message: 'Familiar updated' })
  } catch (err) {
    res.status(500).json({ error: 'Error updating familiar' })
  }
}

// Delete familiar
export const deleteFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    if (!FamiliarID) {
      res.status(400).json({ error: 'FamiliarID is required' })
      return
    }

    // TODO: remove familiar from DB
    res.status(200).json({ message: 'Familiar deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Error deleting familiar' })
  }
}

// Utility: simulate whether a familiar accepts a contract
export const decideContract = (familiar: Familiar): boolean => {
  // Random decision based on familiar personality or other traits
  return Math.random() > 0.5
}