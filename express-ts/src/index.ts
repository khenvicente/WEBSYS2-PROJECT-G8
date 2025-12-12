import express from 'express';
import { sequelize } from './models';
import customerRoutes from './routes/customerRoutes';
import familiarRoutes from './routes/familiarRoutes';
import groupRoutes from './routes/groupRoutes';
import wizardRoutes from './routes/wizardRoutes';
import contractRoutes from './routes/contractRoutes';
import authRoutes from './routes/authRoutes';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4200;

app.use(cors({
  origin: "https://websys2-project-g8-1.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/familiars', familiarRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/wizards', wizardRoutes);
app.use('/api/contracts', contractRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Familiar Management System API' });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connected!");
    return sequelize.sync();
  })
  .catch((err: any) => {
    console.error("Database connection failed:", err);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

