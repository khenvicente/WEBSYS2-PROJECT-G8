import { Request, Response } from 'express'
import { familiarQueries } from '../db/queries'

export const createFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, image, species, size, color, pattern, personality, rarity, typing, GroupID } = req.body

    if (!name) {
      res.status(400).json({ error: "Name is required" })
      return
    }

    const normalizedTyping = Array.isArray(typing)
      ? typing
      : typeof typing === "string" && typing.length > 0
        ? typing.split(",").map((t) => t.trim())
        : []

    const newFamiliar = await familiarQueries.create({
      name,
      image: image || undefined,
      species: species || undefined,
      size: size || undefined,
      color: color || undefined,
      pattern: pattern || undefined,
      personality: personality || undefined,
      rarity: rarity || undefined,
      typing: normalizedTyping.length > 0 ? normalizedTyping : undefined,
      GroupID: GroupID || undefined,
    })
    
    console.log("Received typing:", typing)
    res.status(201).json(newFamiliar)
  } catch (err) {
    console.error("Error creating familiar:", err)
    res.status(500).json({ error: "Error creating familiar" })
  }
}

export const getAllFamiliars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const familiars = await familiarQueries.findAll()
    res.status(200).json(familiars)
  } catch (err) {
    console.error("Error fetching familiars:", err)
    res.status(500).json({ error: "Error fetching familiars" })
  }
}

export const getFamiliarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    if (!FamiliarID) {
      res.status(400).json({ error: "FamiliarID is required" })
      return
    }

    const familiar = await familiarQueries.findById(Number(FamiliarID))
    res.status(200).json(familiar)
  } catch (err) {
    console.error("Error fetching familiar:", err)
    res.status(404).json({ error: "Familiar not found" })
  }
}

export const updateFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    const updates = req.body

    if (!FamiliarID) {
      res.status(400).json({ error: "FamiliarID is required" })
      return
    }

    // Check if familiar exists
    try {
      await familiarQueries.findById(Number(FamiliarID))
    } catch (err) {
      res.status(404).json({ error: "Familiar not found" })
      return
    }

    if (updates.typing) {
      updates.typing = Array.isArray(updates.typing)
        ? updates.typing
        : updates.typing.split(",").map((t: string) => t.trim())
    }

    const updatedFamiliar = await familiarQueries.update(Number(FamiliarID), updates)
    res.status(200).json(updatedFamiliar)
  } catch (err) {
    console.error("Error updating familiar:", err)
    res.status(500).json({ error: "Error updating familiar" })
  }
}

export const deleteFamiliar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { FamiliarID } = req.params
    if (!FamiliarID) {
      res.status(400).json({ error: "FamiliarID is required" })
      return
    }

    // Check if familiar exists
    try {
      await familiarQueries.findById(Number(FamiliarID))
    } catch (err) {
      res.status(404).json({ error: "Familiar not found" })
      return
    }

    await familiarQueries.delete(Number(FamiliarID))
    res.status(200).json({ message: "Familiar deleted" })
  } catch (err) {
    console.error("Error deleting familiar:", err)
    res.status(500).json({ error: "Error deleting familiar" })
  }
}

export const getFamiliarsByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { GroupID } = req.params
    if (!GroupID) {
      res.status(400).json({ error: "GroupID is required" })
      return
    }

    const familiars = await familiarQueries.findByGroup(Number(GroupID))
    res.status(200).json(familiars)
  } catch (err) {
    console.error("Error fetching familiars by group:", err)
    res.status(500).json({ error: "Error fetching familiars by group" })
  }
}