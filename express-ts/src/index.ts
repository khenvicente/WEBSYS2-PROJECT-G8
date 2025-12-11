import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import customerRoutes from './routes/customerRoutes';
import familiarRoutes from './routes/familiarRoutes';
import groupRoutes from './routes/groupRoutes';
import wizardRoutes from './routes/wizardRoutes';
import contractRoutes from './routes/contractRoutes';
import authRoutes from './routes/authRoutes';
import cors from "cors";
import { supabase } from './db/supabase';

const app = express();
const PORT = process.env.PORT || 4200;

// FIX: Allow requests from frontend
app.use(cors({
  origin: ["http://localhost:5173", "https://websys2-project-g8-mm7i.onrender.com"],
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

const startServer = async () => {
  try {
    const { data, error } = await supabase.from('wizards').select('count');
    
    if (error) {
      console.error("Supabase connection failed:", error);
    } else {
      console.log("Supabase connected successfully!");
    }
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
  } finally {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

startServer();