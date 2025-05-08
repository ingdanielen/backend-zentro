/**
 * Archivo principal de la aplicación Zentro Backend
 * Este archivo configura el servidor Express, las conexiones a la base de datos
 * y registra todas las rutas de la API.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import productRoutes from './routes/productRoutes';
import parameterRoutes from './routes/parameterRoutes';
import authRoutes from './routes/authRoutes';
import { seedProducts } from './seeds/productSeeds';
import { seedUsers } from './seeds/userSeeds';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Parsear JSON en las peticiones

// Connect to MongoDB
connectDB().then(() => {
  // Seed initial data
  seedProducts();
  seedUsers();
});

// Routes
app.use('/api', productRoutes);
app.use('/api', parameterRoutes);
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Zentro API' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    data: null,
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 