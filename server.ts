import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './src/backend/config/db';
import { errorHandler } from './src/backend/middleware/errorMiddleware';

import authRoutes from './src/backend/routes/authRoutes';
import userRoutes from './src/backend/routes/userRoutes';
import roomRoutes from './src/backend/routes/roomRoutes';
import bookingRoutes from './src/backend/routes/bookingRoutes';
import adminRoutes from './src/backend/routes/adminRoutes';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  // Connect to Database
  connectDB();

  // Security & standard middleware
  app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/rooms', roomRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/admin', adminRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV });
  });

  // Error Handling Middleware
  app.use(errorHandler);

  // Vite middleware for development & Static file serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
  });
}

startServer();
