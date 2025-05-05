import { Router } from 'express';
import { getParameters, updateParameter, getSearchParameters } from '../controllers/parameterController';

const router = Router();

// Get all parameters or filter by type
router.get('/parameters', getParameters);

// Get parameters for search (categories and brands)
router.get('/search', getSearchParameters);

// Update parameter count
router.post('/parameters/update', updateParameter);

export default router;