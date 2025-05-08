import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';
import { ApiResponse, PaginatedResponse, SearchQuery } from '../types/api';
import messages from '../constants/messages';
import Parameter from '../models/Parameter';

export const searchProducts = async (req: Request, res: Response<ApiResponse<PaginatedResponse<IProduct>>>) => {
  try {
    const { q, page = 1, limit = 10, category, brand, minPrice, maxPrice, ...rest } = req.query as SearchQuery;
    const skip = (page - 1) * limit;

    // Build search query
    const query: any = { active: true };
    
    // Text search across multiple fields
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ];
    } 

    // Specific field searches
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Add any other field searches from the query parameters
    Object.entries(rest).forEach(([key, value]) => {
      if (value) {
        // For numeric fields
        if (['stock', 'width', 'height', 'weight', 'price', 'rating'].includes(key)) {
          query[key] = Number(value);
        } else {
          // For string fields, use case-insensitive search
          query[key] = { $regex: value, $options: 'i' };
        }
      }
    });

    // Execute query with pagination
    const [products, total] = await Promise.all([
      Product.find(query)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      success: true,
      message: messages.success.productsRetrieved,
      data: {
        items: products,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages
      }
    });
  } catch (error: any) {
    console.error('Error in searchProducts:', error);
    res.status(500).json({
      success: false,
      message: messages.error.productsNotRetrieved,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getProductById = async (req: Request, res: Response<ApiResponse<IProduct>>) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: messages.error.productNotFound,
        data: null
      });
    }

    res.json({
      success: true,
      message: messages.success.productRetrieved,
      data: product
    });
  } catch (error: any) {
    console.error('Error in getProductById:', error);
    res.status(500).json({
      success: false,
      message: messages.error.productNotRetrieved,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const createProduct = async (req: Request, res: Response<ApiResponse<IProduct>>) => {
  try {
    const product = new Product(req.body);
    await product.save();

    // Update parameters
    await Promise.all([
      Parameter.findOneAndUpdate(
        { type: 'category', name: product.category },
        { 
          $inc: { count: 1 },
          lastUsed: new Date()
        },
        { 
          upsert: true,
          new: true
        }
      ),
      Parameter.findOneAndUpdate(
        { type: 'brand', name: product.brand },
        { 
          $inc: { count: 1 },
          lastUsed: new Date()
        },
        { 
          upsert: true,
          new: true
        }
      )
    ]);

    res.status(201).json({
      success: true,
      message: messages.success.productCreated,
      data: product
    });
  } catch (error: any) {
    console.error('Error in createProduct:', error);
    res.status(500).json({
      success: false,
      message: messages.error.productNotCreated,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateProduct = async (req: Request, res: Response<ApiResponse<IProduct>>) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: messages.error.productNotFound,
        data: null
      });
    }

    // Update parameters if category or brand changed
    if (updateData.category || updateData.brand) {
      await Promise.all([
        updateData.category && Parameter.findOneAndUpdate(
          { type: 'category', name: updateData.category },
          { 
            $inc: { count: 1 },
            lastUsed: new Date()
          },
          { 
            upsert: true,
            new: true
          }
        ),
        updateData.brand && Parameter.findOneAndUpdate(
          { type: 'brand', name: updateData.brand },
          { 
            $inc: { count: 1 },
            lastUsed: new Date()
          },
          { 
            upsert: true,
            new: true
          }
        )
      ].filter(Boolean));
    }

    res.json({
      success: true,
      message: messages.success.productUpdated,
      data: product
    });
  } catch (error: any) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({
      success: false,
      message: messages.error.productNotUpdated,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 