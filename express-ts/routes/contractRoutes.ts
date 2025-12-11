// routes/contractRoutes.ts
import { Router } from 'express';
import ContractController from '../controllers/contractControllers';

const router = Router();

router.get('/', ContractController.getContracts);
router.post('/', ContractController.createContract);

export default router;
