import { Router } from 'express';
import {
  createWizard,
  getAllWizards,
  getWizardById,
  updateWizard,
  deleteWizard,
  getWizardGroups,
  reviewContract,
  getWizardContracts
} from '../controllers/wizardController';

const router = Router();

// Create a new wizard
router.post('/', createWizard);

// Get all wizards
router.get('/', getAllWizards);

// Get wizard by ID
router.get('/:WizardID', getWizardById);

// Get groups created by wizard
router.get('/:WizardID/groups', getWizardGroups);

// Get contracts for wizard's groups
router.get('/:WizardID/contracts', getWizardContracts);

// Update wizard
router.put('/:WizardID', updateWizard);

// Review/approve/reject a contract
router.put('/:WizardID/contract/:ContractID', reviewContract);

// Delete wizard
router.delete('/:WizardID', deleteWizard);

export default router;