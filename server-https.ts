import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import express from 'express';
import helmet from 'helmet';
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

// HTTP to HTTPS Redirect Server
const HTTP_PORT = process.env.PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

async function startServer() {
  const app = express();

  // Secure Headers with Helmet (enforces HTTPS/HSTS)
  app.use(helmet());
  app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }));

  // Connect Database
  connectDB();

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

  // HTTP to HTTPS Redirect Server
  http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(HTTP_PORT, () => {
    console.log(`HTTP Server running on port ${HTTP_PORT} and redirecting to HTTPS`);
  });

  // HTTPS Server Setup
  try {
    const privateKeyPath = path.resolve(process.env.KEY_PATH || './certs/server.key');
    const certificatePath = path.resolve(process.env.CERT_PATH || './certs/server.crt');
    
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    const certificate = fs.readFileSync(certificatePath, 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`HTTPS Server running on port ${HTTPS_PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`  ➜  Local:   https://localhost:${HTTPS_PORT}/`);
    });
  } catch (error) {
    console.error("Failed to start HTTPS server. Missing or invalid SSL certificates.", error);
    console.warn("Please check the README.md for instructions on generating self-signed certificates.");
  }
}

startServer();
