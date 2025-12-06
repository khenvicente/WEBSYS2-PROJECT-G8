import { Request, Response } from 'express'
import db from "../models"

// Create a new familiar
export const createFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, img, species, size, color, pattern, personality, rarity, typing } = req.body

    if (!name) {
      res.status(400).json({ error: "Name is required" })
      return
    }

    const normalizedTyping = Array.isArray(typing)
      ? typing
      : typeof typing === "string" && typing.length > 0
        ? typing.split(",").map((t) => t.trim())
        : []

    const newFamiliar = await db.Familiar.create({
      name,
      img: img || null,
      species: species || null,
      size: size || null,
      color: color || null,
      pattern: pattern || null,
      personality: personality || null,
      rarity: rarity || null,
      typing: normalizedTyping,
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
    const familiars = await db.Familiar.findAll()
    res.status(200).json(familiars)
  } catch (err) {
    console.error("Error fetching familiars:", err)
    res.status(500).json({ error: "Error fetching familiars" })
  }
}

// Get familiar by ID
export const getFamiliarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    if (!FamiliarID) {
      res.status(400).json({ error: "FamiliarID is required" })
      return
    }

    const familiar = await db.Familiar.findByPk(FamiliarID)
    if (!familiar) {
      res.status(404).json({ error: "Familiar not found" })
      return
    }

    res.status(200).json(familiar)
  } catch (err) {
    console.error("Error fetching familiar:", err)
    res.status(500).json({ error: "Error fetching familiar" })
  }
}

// Update familiar
export const updateFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    const updates = req.body

    if (!FamiliarID) {
      res.status(400).json({ error: "FamiliarID is required" })
      return
    }

    const familiar = await db.Familiar.findByPk(FamiliarID)
    if (!familiar) {
      res.status(404).json({ error: "Familiar not found" })
      return
    }

    if (updates.typing) {
      updates.typing = Array.isArray(updates.typing)
        ? updates.typing
        : updates.typing.split(",").map((t: string) => t.trim())
    }

    await familiar.update(updates)
    res.status(200).json(familiar)
  } catch (err) {
    console.error("Error updating familiar:", err)
    res.status(500).json({ error: "Error updating familiar" })
  }
}

// Delete familiar
export const deleteFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    if (!FamiliarID) {
      res.status(400).json({ error: "FamiliarID is required" })
      return
    }

    const familiar = await db.Familiar.findByPk(FamiliarID)
    if (!familiar) {
      res.status(404).json({ error: "Familiar not found" })
      return
    }

    await familiar.destroy()
    res.status(200).json({ message: "Familiar deleted" })
  } catch (err) {
    console.error("Error deleting familiar:", err)
    res.status(500).json({ error: "Error deleting familiar" })
  }
}

// Get familiars by group
export const getFamiliarsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params
    if (!GroupID) {
      res.status(400).json({ error: "GroupID is required" })
      return
    }

    const familiars = await db.Familiar.findAll({
      where: { GroupID }
    })
    res.status(200).json(familiars)
  } catch (err) {
    console.error("Error fetching familiars by group:", err)
    res.status(500).json({ error: "Error fetching familiars by group" })
  }
}
