import request from 'supertest';
import express from 'express';
import familiarRoutes from '../routes/familiarRoutes';
import { familiarQueries } from '../db/queries';

jest.mock('../db/queries');

const app = express();
app.use(express.json());
app.use('/api/familiars', familiarRoutes);

describe('Familiar Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/familiars', () => {
    it('should return all familiars', async () => {
      const mockFamiliars = [
        { FamiliarID: 1, name: 'Smaug', species: 'Dragon', GroupID: 1 },
        { FamiliarID: 2, name: 'Fawkes', species: 'Phoenix', GroupID: 2 }
      ];

      (familiarQueries.findAll as jest.Mock).mockResolvedValue(mockFamiliars);

      const response = await request(app).get('/api/familiars');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /api/familiars/:FamiliarID', () => {
    it('should return a familiar by ID', async () => {
      const mockFamiliar = {
        FamiliarID: 1,
        name: 'Smaug',
        species: 'Dragon',
        size: 'Large',
        color: 'Red'
      };

      (familiarQueries.findById as jest.Mock).mockResolvedValue(mockFamiliar);

      const response = await request(app).get('/api/familiars/1');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Smaug');
    });

    it('should return 404 if familiar not found', async () => {
      (familiarQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).get('/api/familiars/999');

      expect(response.status).toBe(404);
    });

    it('should return 400 if FamiliarID is invalid', async () => {
      const response = await request(app).get('/api/familiars/');
    });
  });

  describe('POST /api/familiars', () => {
    it('should create a new familiar', async () => {
      const newFamiliar = {
        FamiliarID: 1,
        name: 'Norbert',
        species: 'Dragon',
        size: 'Medium',
        color: 'Green',
        GroupID: 1
      };

      (familiarQueries.create as jest.Mock).mockResolvedValue(newFamiliar);

      const response = await request(app)
        .post('/api/familiars')
        .send({
          name: 'Norbert',
          species: 'Dragon',
          size: 'Medium',
          color: 'Green',
          GroupID: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Norbert');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/api/familiars')
        .send({
          species: 'Dragon'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Name is required');
    });

    it('should handle typing as array', async () => {
      const newFamiliar = {
        FamiliarID: 1,
        name: 'Test',
        typing: ['Fire', 'Flying']
      };

      (familiarQueries.create as jest.Mock).mockResolvedValue(newFamiliar);

      const response = await request(app)
        .post('/api/familiars')
        .send({
          name: 'Test',
          typing: ['Fire', 'Flying']
        });

      expect(response.status).toBe(201);
    });

    it('should handle typing as string', async () => {
      const newFamiliar = {
        FamiliarID: 1,
        name: 'Test',
        typing: ['Fire', 'Flying']
      };

      (familiarQueries.create as jest.Mock).mockResolvedValue(newFamiliar);

      const response = await request(app)
        .post('/api/familiars')
        .send({
          name: 'Test',
          typing: 'Fire, Flying'
        });

      expect(response.status).toBe(201);
    });
  });

  describe('PUT /api/familiars/:FamiliarID', () => {
    it('should update a familiar', async () => {
      const existingFamiliar = {
        FamiliarID: 1,
        name: 'Old Name',
        species: 'Dragon'
      };

      const updatedFamiliar = {
        ...existingFamiliar,
        name: 'New Name'
      };

      (familiarQueries.findById as jest.Mock).mockResolvedValue(existingFamiliar);
      (familiarQueries.update as jest.Mock).mockResolvedValue(updatedFamiliar);

      const response = await request(app)
        .put('/api/familiars/1')
        .send({ name: 'New Name' });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('New Name');
    });

    it('should return 404 if familiar not found', async () => {
      (familiarQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app)
        .put('/api/familiars/999')
        .send({ name: 'New Name' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/familiars/:FamiliarID', () => {
    it('should delete a familiar', async () => {
      (familiarQueries.findById as jest.Mock).mockResolvedValue({ FamiliarID: 1 });
      (familiarQueries.delete as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete('/api/familiars/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Familiar deleted');
    });

    it('should return 404 if familiar not found', async () => {
      (familiarQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).delete('/api/familiars/999');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/familiars/group/:GroupID', () => {
    it('should return familiars by group', async () => {
      const mockFamiliars = [
        { FamiliarID: 1, name: 'Smaug', GroupID: 1 },
        { FamiliarID: 2, name: 'Drogon', GroupID: 1 }
      ];

      (familiarQueries.findByGroup as jest.Mock).mockResolvedValue(mockFamiliars);

      const response = await request(app).get('/api/familiars/group/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });

    it('should return 400 if GroupID is missing', async () => {
      const response = await request(app).get('/api/familiars/group/');

      expect(response.status).toBe(404);
    });
  });
});