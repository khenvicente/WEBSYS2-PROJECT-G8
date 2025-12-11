import request from 'supertest';
import express from 'express';
import contractRoutes from '../routes/contractRoutes';
import { contractQueries, customerQueries, familiarQueries } from '../db/queries';

jest.mock('../db/queries', () => ({
  contractQueries: {
    findAllWithDetails: jest.fn(),
    findByCustomer: jest.fn(),
    create: jest.fn(),
  },
  customerQueries: {
    findById: jest.fn(),
  },
  familiarQueries: {
    findByGroup: jest.fn(),
  },
  wizardQueries: {},
  groupQueries: {},
}));

const app = express();
app.use(express.json());
app.use('/api/contracts', contractRoutes);

describe('Contract Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/contracts', () => {
    it('should return all contracts with details', async () => {
      const mockContracts = [
        {
          ContractID: 1,
          CustomerID: 1,
          FamiliarID: 1,
          status: 'active',
          customers: { CustomerID: 1, name: 'Harry' },
          familiars: { FamiliarID: 1, name: 'Smaug' }
        }
      ];

      (contractQueries.findAllWithDetails as jest.Mock).mockResolvedValue(mockContracts);

      const response = await request(app).get('/api/contracts');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });
  });

  describe('POST /api/contracts', () => {
    it('should create contract when familiar accepts', async () => {
      const mockCustomer = {
        CustomerID: 1,
        GroupID: 1,
        name: 'Harry'
      };

      const mockFamiliars = [
        { FamiliarID: 1, name: 'Smaug', GroupID: 1 }
      ];

      const mockContract = {
        ContractID: 1,
        CustomerID: 1,
        FamiliarID: 1,
        status: 'active'
      };

      (customerQueries.findById as jest.Mock).mockResolvedValue(mockCustomer);
      (contractQueries.findByCustomer as jest.Mock).mockResolvedValue([]);
      (familiarQueries.findByGroup as jest.Mock).mockResolvedValue(mockFamiliars);
      (contractQueries.create as jest.Mock).mockResolvedValue(mockContract);

      // Properly mock Math.random
      const mockMathRandom = jest.spyOn(global.Math, 'random');
      mockMathRandom.mockReturnValue(0.3);

      const response = await request(app)
        .post('/api/contracts')
        .send({ customerId: 1 });

      expect(response.status).toBe(201);
      expect(response.body.message).toContain('Contract formed successfully');
      expect(response.body.contract).toBeDefined();

      mockMathRandom.mockRestore();
    });

    it('should return 404 if customer not found', async () => {
      (customerQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app)
        .post('/api/contracts')
        .send({ customerId: 999 });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Customer not found.');
    });

    it('should return 400 if customer has no group', async () => {
      const mockCustomer = {
        CustomerID: 1,
        GroupID: null,
        name: 'Harry'
      };

      (customerQueries.findById as jest.Mock).mockResolvedValue(mockCustomer);

      const response = await request(app)
        .post('/api/contracts')
        .send({ customerId: 1 });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Customer has no assigned group.');
    });

    it('should return 400 if customer has active contract', async () => {
      const mockCustomer = {
        CustomerID: 1,
        GroupID: 1,
        name: 'Harry'
      };

      const mockContracts = [
        { ContractID: 1, status: 'active' }
      ];

      (customerQueries.findById as jest.Mock).mockResolvedValue(mockCustomer);
      (contractQueries.findByCustomer as jest.Mock).mockResolvedValue(mockContracts);

      const response = await request(app)
        .post('/api/contracts')
        .send({ customerId: 1 });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Customer already has an active contract.');
    });

    it('should return 400 if no familiars in group', async () => {
      const mockCustomer = {
        CustomerID: 1,
        GroupID: 1,
        name: 'Harry'
      };

      (customerQueries.findById as jest.Mock).mockResolvedValue(mockCustomer);
      (contractQueries.findByCustomer as jest.Mock).mockResolvedValue([]);
      (familiarQueries.findByGroup as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .post('/api/contracts')
        .send({ customerId: 1 });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('No familiars available in this group.');
    });

    it('should return message when no familiar accepts', async () => {
      const mockCustomer = {
        CustomerID: 1,
        GroupID: 1,
        name: 'Harry'
      };

      const mockFamiliars = [
        { FamiliarID: 1, name: 'Smaug', GroupID: 1 }
      ];

      (customerQueries.findById as jest.Mock).mockResolvedValue(mockCustomer);
      (contractQueries.findByCustomer as jest.Mock).mockResolvedValue([]);
      (familiarQueries.findByGroup as jest.Mock).mockResolvedValue(mockFamiliars);

      // Properly mock Math.random for rejection
      const mockMathRandom = jest.spyOn(global.Math, 'random');
      mockMathRandom.mockReturnValue(0.7);

      const response = await request(app)
        .post('/api/contracts')
        .send({ customerId: 1 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('No familiars accepted the contract. No contract formed.');
      expect(response.body.contract).toBeNull();

      mockMathRandom.mockRestore();
    });
  });
});