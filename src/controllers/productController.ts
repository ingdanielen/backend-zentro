import { Request, Response, NextFunction } from 'express';
import Product, { IProduct } from '../models/Product';
import { ApiResponse, PaginatedResponse, SearchQuery } from '../types/api';

export const searchProducts = async (req: Request, res: Response<ApiResponse<PaginatedResponse<IProduct>>>, next: NextFunction) => {
  try {
    const { q, page = 1, limit = 10, category, brand, minPrice, maxPrice } = req.query as SearchQuery;
    const skip = (page - 1) * limit;

    // Build search query
    const query: any = { active: true };
    
    if (q) {
      query.$text = { $search: q };
    }
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    // Execute query with pagination
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: {
        total,
        perPage: limit,
        currentPage: page,
        totalPages,
        data: products
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response<ApiResponse<IProduct>>, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response<ApiResponse<IProduct>>, next: NextFunction) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
}; 