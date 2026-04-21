import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { setupWebSocket } from './websocket/socket';

import authRoutes from './routes/auth';
import appointmentRoutes from './routes/appointments';
import inventoryRoutes from './routes/inventory';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

const io = setupWebSocket(server);
app.set('io', io);

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await connectDatabase();
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
