import request from 'supertest';
import express from 'express';
import customerRoutes from '../routes/customerRoutes';
import { customerQueries, contractQueries } from '../db/queries';

jest.mock('../db/queries');

const app = express();
app.use(express.json());
app.use('/api/customers', customerRoutes);

describe('Customer Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/customers', () => {
    it('should return all customers', async () => {
      const mockCustomers = [
        { CustomerID: 1, name: 'Harry Potter', email: 'harry@test.com', role: 'customer' },
        { CustomerID: 2, name: 'Ron Weasley', email: 'ron@test.com', role: 'customer' }
      ];

      (customerQueries.findAll as jest.Mock).mockResolvedValue(mockCustomers);

      const response = await request(app).get('/api/customers');

      expect(response.status).toBe(200);
      expect(response.body.customers).toHaveLength(2);
    });

    it('should handle errors', async () => {
      (customerQueries.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/customers');

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/customers/:CustomerID', () => {
    it('should return a customer by ID', async () => {
      const mockCustomer = {
        CustomerID: 1,
        name: 'Harry Potter',
        email: 'harry@test.com',
        role: 'customer'
      };

      (customerQueries.findById as jest.Mock).mockResolvedValue(mockCustomer);

      const response = await request(app).get('/api/customers/1');

      expect(response.status).toBe(200);
      expect(response.body.customer.name).toBe('Harry Potter');
    });

    it('should return 404 if customer not found', async () => {
      (customerQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).get('/api/customers/999');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/customers/:CustomerID/contracts', () => {
    it('should return customer contracts', async () => {
      const mockContracts = [
        { ContractID: 1, CustomerID: 1, FamiliarID: 1, status: 'active' },
        { ContractID: 2, CustomerID: 1, FamiliarID: 2, status: 'pending' }
      ];

      (contractQueries.findByCustomer as jest.Mock).mockResolvedValue(mockContracts);

      const response = await request(app).get('/api/customers/1/contracts');

      expect(response.status).toBe(200);
      expect(response.body.contracts).toHaveLength(2);
    });
  });

  describe('PUT /api/customers/:CustomerID', () => {
    it('should update a customer', async () => {
      const existingCustomer = {
        CustomerID: 1,
        name: 'Old Name',
        email: 'old@test.com',
        GroupID: 1,
        image: null
      };

      const updatedCustomer = {
        ...existingCustomer,
        name: 'New Name'
      };

      (customerQueries.findById as jest.Mock).mockResolvedValue(existingCustomer);
      (customerQueries.update as jest.Mock).mockResolvedValue(updatedCustomer);

      const response = await request(app)
        .put('/api/customers/1')
        .send({ name: 'New Name' });

      expect(response.status).toBe(200);
      expect(response.body.customer.name).toBe('New Name');
    });

    it('should update customer image', async () => {
      const existingCustomer = { CustomerID: 1, name: 'Harry', image: null };
      const updatedCustomer = { ...existingCustomer, image: 'new-image.jpg' };

      (customerQueries.findById as jest.Mock).mockResolvedValue(existingCustomer);
      (customerQueries.update as jest.Mock).mockResolvedValue(updatedCustomer);

      const response = await request(app)
        .put('/api/customers/1')
        .send({ img: 'new-image.jpg' });

      expect(response.status).toBe(200);
    });

    it('should return 404 if customer not found', async () => {
      (customerQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app)
        .put('/api/customers/999')
        .send({ name: 'New Name' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/customers/:CustomerID', () => {
    it('should delete a customer', async () => {
      (customerQueries.findById as jest.Mock).mockResolvedValue({ CustomerID: 1 });
      (customerQueries.delete as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete('/api/customers/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Customer deleted');
    });

    it('should return 404 if customer not found', async () => {
      (customerQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).delete('/api/customers/999');

      expect(response.status).toBe(404);
    });
  });
});