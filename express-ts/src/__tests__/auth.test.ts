import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes';
import { wizardQueries, customerQueries } from '../db/queries';
import bcrypt from 'bcrypt';

jest.mock('../db/queries');
jest.mock('bcrypt');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new wizard successfully', async () => {
      const mockWizard = {
        WizardID: 1,
        name: 'Test Wizard',
        email: 'test@wizard.com',
        username: 'testwizard',
        password: 'hashedpassword',
        role: 'wizard',
        image: null
      };

      (wizardQueries.findByEmail as jest.Mock).mockRejectedValue(new Error('Not found'));
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (wizardQueries.create as jest.Mock).mockResolvedValue(mockWizard);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Wizard',
          email: 'test@wizard.com',
          username: 'testwizard',
          password: 'password123',
          role: 'wizard'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Registration successful');
      expect(response.body.user).toBeDefined();
      expect(response.body.user.password).toBeUndefined();
    });

    it('should register a new customer successfully', async () => {
      const mockCustomer = {
        CustomerID: 1,
        name: 'Test Customer',
        email: 'test@customer.com',
        username: 'testcustomer',
        password: 'hashedpassword',
        role: 'customer',
        GroupID: null,
        image: null
      };

      (customerQueries.findByEmail as jest.Mock).mockRejectedValue(new Error('Not found'));
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (customerQueries.create as jest.Mock).mockResolvedValue(mockCustomer);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Customer',
          email: 'test@customer.com',
          username: 'testcustomer',
          password: 'password123',
          role: 'customer'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Registration successful');
      expect(response.body.user).toBeDefined();
    });

    it('should return 400 if email already exists', async () => {
      (wizardQueries.findByEmail as jest.Mock).mockResolvedValue({
        WizardID: 1,
        email: 'existing@wizard.com'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test',
          email: 'existing@wizard.com',
          username: 'test',
          password: 'password123',
          role: 'wizard'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('already exists');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email, password, and role are required');
    });

    it('should return 400 for invalid role', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test',
          email: 'test@test.com',
          username: 'test',
          password: 'password123',
          role: 'invalid'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid role');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login wizard successfully', async () => {
      const mockWizard = {
        WizardID: 1,
        name: 'Test Wizard',
        email: 'test@wizard.com',
        username: 'testwizard',
        password: 'hashedpassword',
        role: 'wizard'
      };

      (wizardQueries.findByEmail as jest.Mock).mockResolvedValue(mockWizard);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@wizard.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.user.email).toBe('test@wizard.com');
      expect(response.body.user.role).toBe('wizard');
      expect(response.body.user.password).toBeUndefined();
    });

    it('should login customer successfully', async () => {
      const mockCustomer = {
        CustomerID: 1,
        name: 'Test Customer',
        email: 'test@customer.com',
        username: 'testcustomer',
        password: 'hashedpassword',
        role: 'customer'
      };

      (wizardQueries.findByEmail as jest.Mock).mockRejectedValue(new Error('Not found'));
      (customerQueries.findByEmail as jest.Mock).mockResolvedValue(mockCustomer);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@customer.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.user.role).toBe('customer');
    });

    it('should return 400 for invalid credentials', async () => {
      (wizardQueries.findByEmail as jest.Mock).mockRejectedValue(new Error('Not found'));
      (customerQueries.findByEmail as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return 400 for wrong password', async () => {
      const mockWizard = {
        WizardID: 1,
        email: 'test@wizard.com',
        password: 'hashedpassword'
      };

      (wizardQueries.findByEmail as jest.Mock).mockResolvedValue(mockWizard);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@wizard.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return 400 if email or password missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email and password are required');
    });
  });
});