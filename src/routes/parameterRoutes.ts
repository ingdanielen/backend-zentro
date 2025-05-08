/**
 * Rutas para la gestión de parámetros del sistema
 * Este archivo define las rutas relacionadas con los parámetros del sistema,
 * como categorías y marcas, incluyendo su obtención y actualización.
 */

import { Router, RequestHandler } from 'express';
import { getParameters, updateParameter, getSearchParameters } from '../controllers/parameterController';

const router = Router();

// Obtener todos los parámetros o filtrar por tipo
router.get('/parameters', getParameters as RequestHandler);

// Obtener parámetros para búsqueda (categorías y marcas)
router.get('/search', getSearchParameters as RequestHandler);

// Actualizar conteo de parámetros
router.post('/parameters/update', updateParameter as RequestHandler);

export default router;