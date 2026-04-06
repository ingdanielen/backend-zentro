import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response, json, urlencoded } from 'express';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import parameterRoutes from './routes/parameterRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();

const defaultOrigins = [
  'http://localhost:3000',
  'https://zentro-woad.vercel.app',
];

function parseOriginsFromEnv(): string[] {
  const raw = process.env.CORS_ORIGINS;
  if (!raw?.trim()) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

const vercelPreviewPattern = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }
    const fromEnv = parseOriginsFromEnv();
    if (defaultOrigins.includes(origin) || fromEnv.includes(origin) || vercelPreviewPattern.test(origin)) {
      callback(null, origin);
      return;
    }
    callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 204,
};

const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/api', productRoutes);
app.use('/api/parameters', parameterRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to Zentro API' });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err instanceof Error ? err.stack : err);
  const message = err instanceof Error ? err.message : 'Something went wrong!';
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    data: null,
    error: process.env.NODE_ENV === 'development' ? message : undefined,
  });
});

export default app;
