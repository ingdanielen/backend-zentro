/**
 * Archivo principal de la aplicación Zentro Backend
 * Este archivo configura el servidor Express, las conexiones a la base de datos
 * y registra todas las rutas de la API.
 */

import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response, json, urlencoded } from 'express';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import parameterRoutes from './routes/parameterRoutes';
import productRoutes from './routes/productRoutes';
import { seedProducts } from './seeds/productSeeds';
import { seedUsers } from './seeds/userSeeds';

// Cargar variables de entorno
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://zentro-woad.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(json()); // Parsear JSON en las peticiones
app.use(urlencoded({ extended: true })); // Parsear URL-encoded en las peticiones

// Connect to MongoDB
connectDB().then(async () => {
  // Seed initial data
  await seedProducts();
  await seedUsers();
  console.log('Initial data seeded successfully');
}).catch(error => {
  console.error('Error during initialization:', error);
  process.exit(1);
});

// Routes
app.use('/api', productRoutes);
app.use('/api', parameterRoutes);
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req: Request, res: Response ) => {
  res.json({ message: 'Welcome to Zentro API' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
app.listen(Number(PORT), () => {
  console.log(`Server is running on port ${PORT}`);
}); 