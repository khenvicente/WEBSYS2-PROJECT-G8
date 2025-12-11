import { Request, Response } from "express";
import { groupQueries } from "../db/queries";

export const createGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { price, WizardID, species, size, color, pattern, personality, rarity, typing } = req.body;

    if (price == null) {
      res.status(400).json({ error: "Price is required" });
      return;
    }

    const newGroup = await groupQueries.create({
      price,
      WizardID: WizardID || undefined,
      species: species || undefined,
      size: size || undefined,
      color: color || undefined,
      pattern: pattern || undefined,
      personality: personality || undefined,
      rarity: rarity || undefined,
      typing: typing || undefined,
    });

    res.status(201).json(newGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating group" });
  }
};

export const getAllGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await groupQueries.findAll();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: "Error fetching groups" });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const group = await groupQueries.findById(Number(req.params.GroupID));
    res.json(group);
  } catch (err) {
    res.status(404).json({ error: "Group not found" });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    // Check if group exists
    try {
      await groupQueries.findById(Number(req.params.GroupID));
    } catch (err) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    const updatedGroup = await groupQueries.update(Number(req.params.GroupID), req.body);
    res.json(updatedGroup);
  } catch (err) {
    res.status(500).json({ error: "Error updating group" });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    // Check if group exists
    try {
      await groupQueries.findById(Number(req.params.GroupID));
    } catch (err) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    await groupQueries.delete(Number(req.params.GroupID));
    res.json({ message: "Group deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting group" });
  }
};