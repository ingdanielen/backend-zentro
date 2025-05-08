/**
 * Controlador para la gestión de parámetros del sistema
 * Este archivo contiene la lógica para manejar las operaciones relacionadas
 * con los parámetros del sistema, como categorías y marcas.
 */

import { Request, Response } from 'express';
import Parameter, { IParameter } from '../models/Parameter';
import Product from '../models/Product';
import { ApiResponse } from '../types/api';
import messages from '../constants/messages';

// Tipo para las estadísticas de parámetros
type ParameterStats = {
  type: 'category' | 'brand';
  name: string;
  count: number;
  lastUsed: Date;
  totalProducts: number;
  totalStock: number;
  averagePrice: number;
  createdAt: Date;
  updatedAt: Date;
};

// Tipo para parámetros de búsqueda
type SearchParameter = {
  name: string;
  count: number;
  totalProducts: number;
};

/**
 * Obtiene todos los parámetros o los filtra por tipo
 * @param req - Request de Express
 * @param res - Response de Express
 */
export const getParameters = async (req: Request, res: Response<ApiResponse<ParameterStats[]>>) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};

    // Obtener parámetros con estadísticas básicas
    const parameters = await Parameter.find(query).sort({ count: -1 });

    // Obtener estadísticas adicionales
    const stats = await Promise.all(parameters.map(async (param) => {
      const products = await Product.find({ [param.type]: param.name });
      
      // Calcular estadísticas
      const totalProducts = products.length;
      const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
      const averagePrice = products.length > 0 
        ? products.reduce((sum, product) => sum + (product.price || 0), 0) / products.length 
        : 0;

      // Actualizar parámetro con nuevas estadísticas
      await Parameter.findByIdAndUpdate(param._id, {
        totalProducts,
        totalStock,
        averagePrice
      });

      return {
        ...param.toObject(),
        totalProducts,
        totalStock,
        averagePrice
      };
    }));

    res.json({
      success: true,
      message: messages.success.parametersRetrieved,
      data: stats
    });
  } catch (error: any) {
    console.error('Error en getParameters:', error);
    res.status(500).json({
      success: false,
      message: messages.error.parametersNotRetrieved,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Actualiza el conteo y estadísticas de un parámetro
 * @param req - Request de Express
 * @param res - Response de Express
 */
export const updateParameter = async (req: Request, res: Response<ApiResponse<IParameter>>) => {
  try {
    const { type, name } = req.body;

    // Obtener estadísticas actuales del producto
    const products = await Product.find({ [type]: name });
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
    const averagePrice = products.length > 0 
      ? products.reduce((sum, product) => sum + (product.price || 0), 0) / products.length 
      : 0;

    const parameter = await Parameter.findOneAndUpdate(
      { type, name },
      { 
        $inc: { count: 1 },
        lastUsed: new Date(),
        totalProducts,
        totalStock,
        averagePrice
      },
      { 
        upsert: true,
        new: true
      }
    );

    res.json({
      success: true,
      message: messages.success.parameterUpdated,
      data: parameter
    });
  } catch (error: any) {
    console.error('Error en updateParameter:', error);
    res.status(500).json({
      success: false,
      message: messages.error.parameterNotUpdated,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Obtiene parámetros para búsqueda (categorías y marcas)
 * @param req - Request de Express
 * @param res - Response de Express
 */
export const getSearchParameters = async (req: Request, res: Response<ApiResponse<{ categories: SearchParameter[], brands: SearchParameter[] }>>) => {
  try {
    const [categories, brands] = await Promise.all([
      Parameter.find({ type: 'category' })
        .select('name count totalProducts')
        .sort({ count: -1 }),
      Parameter.find({ type: 'brand' })
        .select('name count totalProducts')
        .sort({ count: -1 })
    ]);

    res.json({
      success: true,
      message: messages.success.parametersRetrieved,
      data: {
        categories: categories.map(cat => ({
          name: cat.name,
          count: cat.count,
          totalProducts: cat.totalProducts
        })),
        brands: brands.map(brand => ({
          name: brand.name,
          count: brand.count,
          totalProducts: brand.totalProducts
        }))
      }
    });
  } catch (error: any) {
    console.error('Error en getSearchParameters:', error);
    res.status(500).json({
      success: false,
      message: messages.error.parametersNotRetrieved,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};