import { Request, Response } from "express";
import { Group } from "../models";

export const createGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { price, WizardID } = req.body;

    if (price == null) {
      res.status(400).json({ error: "Price is required" });
      return;
    }

    const newGroup = await Group.create({
      price,
      WizardID: WizardID || null,
      species: null,
      size: null,
      color: null,
      pattern: null,
      personality: null,
      rarity: null,
      typing: null,
    });

    res.status(201).json(newGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating group" });
  }
};

export const getAllGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: "Error fetching groups" });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByPk(req.params.GroupID);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Error fetching group" });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByPk(req.params.GroupID);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    await group.update(req.body);
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Error updating group" });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByPk(req.params.GroupID);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    await group.destroy();

    res.json({ message: "Group deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting group" });
  }
};
