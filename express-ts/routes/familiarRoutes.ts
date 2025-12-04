import { Router } from 'express';
import {
  createFamiliar,
  getAllFamiliars,
  getFamiliarById,
  getFamiliarsByGroup,
  updateFamiliar,
  deleteFamiliar
} from '../controllers/familiarController';

const router = Router();

// Create a new familiar
router.post('/', createFamiliar);

// Get all familiars
router.get('/', getAllFamiliars);

// Get familiar by ID
router.get('/:FamiliarID', getFamiliarById);

// Get familiars by group
router.get('/group/:GroupID', getFamiliarsByGroup);

// Update familiar
router.put('/:FamiliarID', updateFamiliar);

// Delete familiar
router.delete('/:FamiliarID', deleteFamiliar);

export default router;