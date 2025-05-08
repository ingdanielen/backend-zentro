/**
 * Rutas para la gestión de productos
 * Este archivo define las rutas relacionadas con los productos,
 * incluyendo búsqueda, creación, actualización y obtención por ID.
 */

import { RequestHandler, Router } from 'express';
import { searchProducts, createProduct, updateProduct, getProductById } from '../controllers/productController';
import { validateProduct } from '../middleware/validationMiddleware';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

// Rutas públicas (no requieren autenticación)
router.get('/items', searchProducts as RequestHandler);
router.get('/items/:id', getProductById as RequestHandler);

// Rutas protegidas (requieren autenticación y rol de admin)
router.post('/items', 
  authenticateToken as RequestHandler,
  isAdmin as RequestHandler,
  validateProduct as RequestHandler, 
  createProduct as RequestHandler
);

router.put('/items/:id', 
  authenticateToken as RequestHandler,
  isAdmin as RequestHandler,
  validateProduct as RequestHandler, 
  updateProduct as RequestHandler
);

export default router; 