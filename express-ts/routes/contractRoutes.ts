import { Router } from 'express';
import {
  matchCustomerToGroup,
  getFamiliarsByGroup,
  createContract,
  getContractStatus,
  getGroupPricing
} from '../controllers/contractControllers';

const router = Router();

// Match customer to a group
router.post('/match', matchCustomerToGroup);

// Get familiars in a group
router.get('/familiars/:GroupID', getFamiliarsByGroup);

// Create a new contract
router.post('/contract', createContract);

// Get contract status by ID
router.get('/contract/:ContractID', getContractStatus);

// Get pricing for a group
router.get('/pricing/:GroupID', getGroupPricing);

export default router;