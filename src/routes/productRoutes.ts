import { Router, RequestHandler } from 'express';
import { searchProducts, getProductById, createProduct } from '../controllers/productController';
import { SearchQuery } from '../types/api';
import { IProduct } from '../models/Product';

const router = Router();

// Search products with pagination
router.get('/items', searchProducts as RequestHandler);

// Get product by ID
router.get('/items/:id', getProductById as RequestHandler);

// Create new product
router.post('/create', createProduct as RequestHandler);

export default router; 