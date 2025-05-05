import { RequestHandler, Router } from 'express';
import { searchProducts, getProductById, createProduct, updateProduct } from '../controllers/productController';

const router = Router();

// Search products
router.get('/search', searchProducts as RequestHandler);

// Get product by ID
router.get('/:id', getProductById as RequestHandler);

// Create product
router.post('/', createProduct as RequestHandler);

// Update product
router.put('/:id', updateProduct as RequestHandler);

export default router; 