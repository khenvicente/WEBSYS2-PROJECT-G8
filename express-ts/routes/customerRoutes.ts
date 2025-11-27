import { Router } from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerContracts,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController';

const router = Router();

// Create a new customer
router.post('/', createCustomer);

// Get all customers
router.get('/', getAllCustomers);

// Get customer by ID
router.get('/:CustomerID', getCustomerById);

// Get customer's contracts
router.get('/:CustomerID/contracts', getCustomerContracts);

// Update customer
router.put('/:CustomerID', updateCustomer);

// Delete customer
router.delete('/:CustomerID', deleteCustomer);

export default router;