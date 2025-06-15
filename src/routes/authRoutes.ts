import { Router, RequestHandler } from 'express';
import { login } from '../controllers/authController';
import { validateLogin } from '../middleware/validationMiddleware';

const router = Router();

// Login route with validation
router.post('/login', validateLogin as RequestHandler, login as RequestHandler);

export default router; 