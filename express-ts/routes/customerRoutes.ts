import { Router } from 'express';
import {
  getAllCustomers,
  getCustomerById,
  getCustomerContracts,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController';

const router = Router();

router.get('/', getAllCustomers);
router.get('/:CustomerID', getCustomerById);
router.get('/:CustomerID/contracts', getCustomerContracts);
router.put('/:CustomerID', updateCustomer);
router.delete('/:CustomerID', deleteCustomer);

export default router;
