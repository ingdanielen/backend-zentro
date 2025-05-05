import { RequestHandler, Router } from 'express';
import { searchProducts, getProductById, createProduct, updateProduct } from '../controllers/productController';

const router = Router();

// Search products
router.get('/items', searchProducts as RequestHandler);

// Get product by ID
router.get('/items/:id', getProductById as RequestHandler);

// Create product
router.post('/items', createProduct as RequestHandler);

// Update product
router.put('/items/:id', updateProduct as RequestHandler);

export default router; 