import request from 'supertest';
import express from 'express';
import wizardRoutes from '../routes/wizardRoutes';
import { wizardQueries, groupQueries, contractQueries } from '../db/queries';

jest.mock('../db/queries');

const app = express();
app.use(express.json());
app.use('/api/wizards', wizardRoutes);

describe('Wizard Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/wizards', () => {
    it('should return all wizards', async () => {
      const mockWizards = [
        { WizardID: 1, name: 'Merlin', email: 'merlin@test.com', role: 'wizard', username: 'merlin', password: 'hash' },
        { WizardID: 2, name: 'Gandalf', email: 'gandalf@test.com', role: 'wizard', username: 'gandalf', password: 'hash' }
      ];

      (wizardQueries.findAll as jest.Mock).mockResolvedValue(mockWizards);

      const response = await request(app).get('/api/wizards');

      expect(response.status).toBe(200);
      expect(response.body.wizards).toHaveLength(2);
      expect(wizardQueries.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors', async () => {
      (wizardQueries.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/wizards');

      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/wizards/:WizardID', () => {
    it('should return a wizard by ID', async () => {
      const mockWizard = {
        WizardID: 1,
        name: 'Merlin',
        email: 'merlin@test.com',
        username: 'merlin',
        password: 'hash',
        role: 'wizard'
      };

      (wizardQueries.findById as jest.Mock).mockResolvedValue(mockWizard);

      const response = await request(app).get('/api/wizards/1');

      expect(response.status).toBe(200);
      expect(response.body.wizard.name).toBe('Merlin');
      expect(response.body.wizard.password).toBeUndefined();
    });

    it('should return 404 if wizard not found', async () => {
      (wizardQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).get('/api/wizards/999');

      expect(response.status).toBe(404);
    });

    it('should return 400 if WizardID missing', async () => {
      const response = await request(app).get('/api/wizards/');
    });
  });

  describe('PUT /api/wizards/:WizardID', () => {
    it('should update a wizard', async () => {
      const existingWizard = {
        WizardID: 1,
        name: 'Old Name',
        email: 'old@test.com',
        username: 'old',
        password: 'hash',
        role: 'wizard'
      };

      const updatedWizard = {
        ...existingWizard,
        name: 'New Name'
      };

      (wizardQueries.findById as jest.Mock).mockResolvedValue(existingWizard);
      (wizardQueries.update as jest.Mock).mockResolvedValue(updatedWizard);

      const response = await request(app)
        .put('/api/wizards/1')
        .send({ name: 'New Name' });

      expect(response.status).toBe(200);
      expect(response.body.wizard.name).toBe('New Name');
      expect(response.body.wizard.password).toBeUndefined();
    });

    it('should return 404 if wizard not found', async () => {
      (wizardQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app)
        .put('/api/wizards/999')
        .send({ name: 'New Name' });

      expect(response.status).toBe(404);
    });

    it('should not allow password update through this endpoint', async () => {
      const existingWizard = {
        WizardID: 1,
        name: 'Merlin',
        password: 'oldhash'
      };

      (wizardQueries.findById as jest.Mock).mockResolvedValue(existingWizard);
      (wizardQueries.update as jest.Mock).mockResolvedValue(existingWizard);

      const response = await request(app)
        .put('/api/wizards/1')
        .send({ password: 'newhash' });

      expect(wizardQueries.update).toHaveBeenCalledWith(1, {});
    });
  });

  describe('DELETE /api/wizards/:WizardID', () => {
    it('should delete a wizard', async () => {
      (wizardQueries.findById as jest.Mock).mockResolvedValue({ WizardID: 1 });
      (wizardQueries.delete as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete('/api/wizards/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Wizard deleted');
    });

    it('should return 404 if wizard not found', async () => {
      (wizardQueries.findById as jest.Mock).mockRejectedValue(new Error('Not found'));

      const response = await request(app).delete('/api/wizards/999');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/wizards/:WizardID/groups', () => {
    it('should return groups created by wizard', async () => {
      const mockGroups = [
        { GroupID: 1, WizardID: 1, price: 100, species: 'Dragon' },
        { GroupID: 2, WizardID: 1, price: 50, species: 'Phoenix' }
      ];

      (groupQueries.findByWizard as jest.Mock).mockResolvedValue(mockGroups);

      const response = await request(app).get('/api/wizards/1/groups');

      expect(response.status).toBe(200);
      expect(response.body.groups).toHaveLength(2);
    });
  });
});