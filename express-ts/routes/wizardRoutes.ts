import { Router } from 'express';
import {
  getAllWizards,
  getWizardById,
  updateWizard,
  deleteWizard,
  getWizardGroups,
  reviewContract,
  getWizardContracts
} from '../controllers/wizardController';

const router = Router();

router.get('/', getAllWizards);
router.get('/:WizardID', getWizardById);
router.get('/:WizardID/groups', getWizardGroups);
router.get('/:WizardID/contracts', getWizardContracts);
router.put('/:WizardID', updateWizard);
router.put('/:WizardID/contract/:ContractID', reviewContract);
router.delete('/:WizardID', deleteWizard);

export default router;