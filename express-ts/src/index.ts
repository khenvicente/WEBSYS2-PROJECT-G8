import express from 'express';
import db from '../models/index';
import customerRoutes from '../routes/customerRoutes';
import familiarRoutes from '../routes/familiarRoutes';
import groupRoutes from '../routes/groupRoutes';
import wizardRoutes from '../routes/wizardRoutes';
import contractRoutes from '../routes/contractRoutes';

const app = express();
const PORT = process.env.PORT || 4200;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/familiars', familiarRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/wizards', wizardRoutes);
app.use('/api/contracts', contractRoutes);

// Root route
app.get('/', (_req, res) => {
  res.json({ message: 'Familiar Management System API' });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Database sync and server start
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Database synced successfully');
  });
}).catch((err: any) => {
  console.error('Database sync failed:', err);
});