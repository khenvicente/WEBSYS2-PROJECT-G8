import { Router } from 'express';
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  getGroupPricing,
  addFamiliarToGroup,
  removeFamiliarFromGroup
} from '../controllers/groupController';

const router = Router();

// Create a new group
router.post('/', createGroup);

// Get all groups
router.get('/', getAllGroups);

// Get group by ID
router.get('/:GroupID', getGroupById);

// Get pricing for a group
router.get('/:GroupID/pricing', getGroupPricing);

// Update group
router.put('/:GroupID', updateGroup);

// Delete group
router.delete('/:GroupID', deleteGroup);

// Add familiar to group
router.post('/:GroupID/familiar', addFamiliarToGroup);

// Remove familiar from group
router.delete('/:GroupID/familiar', removeFamiliarFromGroup);

export default router;