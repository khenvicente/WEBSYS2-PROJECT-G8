import request from 'supertest';
import express from 'express';
import groupRoutes from '../routes/groupRoutes';
import { groupQueries } from '../db/queries';

jest.mock('../db/queries');

const app = express();
app.use(express.json());
app.use('/api/groups', groupRoutes);

describe('Group Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/groups', () => {
    it('should return all groups', async () => {
      const mockGroups = [
        { GroupID: 1, price: 100, species: 'Dragon', WizardID: 1 },
        { GroupID: 2, price: 50, species: 'Phoenix', WizardID: 1 }
      ];

      (groupQueries.findAll as jest.Mock).mockResolvedValue(mockGroups);

      const response = await request(app).get('/api/groups');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /api/groups/:GroupID', () => {
    it('should return a group by ID', async () => {
      const mockGroup = {
        GroupID: 1,
        price: 100,
        species: 'Dragon',
        WizardID: 1
      };

      (groupQueries.findById as jest.Mock).mockResolvedValue(mockGroup);

      const response = await request(app).get('/api/groups/1');

      expect(response.status).toBe(200);
      expect(response.body.species).toBe('Dragon');
    });

    it('should return 404 if group not found', async () => {
      (groupQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).get('/api/groups/999');

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/groups', () => {
    it('should create a new group', async () => {
      const newGroup = {
        GroupID: 1,
        price: 100,
        WizardID: 1,
        species: 'Dragon'
      };

      (groupQueries.create as jest.Mock).mockResolvedValue(newGroup);

      const response = await request(app)
        .post('/api/groups')
        .send({
          price: 100,
          WizardID: 1,
          species: 'Dragon'
        });

      expect(response.status).toBe(201);
      expect(response.body.price).toBe(100);
    });

    it('should return 400 if price is missing', async () => {
      const response = await request(app)
        .post('/api/groups')
        .send({
          WizardID: 1
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Price is required');
    });
  });

  describe('PUT /api/groups/:GroupID', () => {
    it('should update a group', async () => {
      const existingGroup = {
        GroupID: 1,
        price: 100,
        species: 'Dragon'
      };

      const updatedGroup = {
        ...existingGroup,
        price: 150
      };

      (groupQueries.findById as jest.Mock).mockResolvedValue(existingGroup);
      (groupQueries.update as jest.Mock).mockResolvedValue(updatedGroup);

      const response = await request(app)
        .put('/api/groups/1')
        .send({ price: 150 });

      expect(response.status).toBe(200);
      expect(response.body.price).toBe(150);
    });

    it('should return 404 if group not found', async () => {
      (groupQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app)
        .put('/api/groups/999')
        .send({ price: 150 });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/groups/:GroupID', () => {
    it('should delete a group', async () => {
      (groupQueries.findById as jest.Mock).mockResolvedValue({ GroupID: 1 });
      (groupQueries.delete as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete('/api/groups/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Group deleted');
    });

    it('should return 404 if group not found', async () => {
      (groupQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).delete('/api/groups/999');

      expect(response.status).toBe(404);
    });
  });
});