import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { discoveryRoutes } from './routes/discovery';
import { authRoutes } from './routes/auth';
import { integrationRoutes } from './routes/integrations';
import { requestLogger, errorHandler, notFound } from './middleware/common';
import { seedDatabase } from './services/databaseService';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Popular banco com dados de exemplo em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  seedDatabase();
}

// Rotas
app.use('/api/discovery', discoveryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/integrations', integrationRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware de erro e 404
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

