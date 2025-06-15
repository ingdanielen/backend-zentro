import { Router, RequestHandler } from 'express';
import { login } from '../controllers/authController';
import { validateLogin } from '../middleware/validationMiddleware';

const router = Router();

// Add CORS headers middleware
const corsHeaders = (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', 'https://zentro-woad.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
};

// Apply CORS headers to all routes
router.use(corsHeaders);

// Login route with validation
router.post('/login', validateLogin as RequestHandler, login as RequestHandler);

export default router; 