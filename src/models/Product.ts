/**
 * Modelo de Productos
 * Este modelo define la estructura de los productos en el sistema,
 * incluyendo sus propiedades y validaciones.
 */

import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interfaz que define la estructura de un producto
 */
export interface IProduct extends Document {
  name: string;                // Nombre del producto
  description: string;         // Descripción detallada
  price: number;              // Precio del producto
  stock: number;              // Cantidad en inventario
  category: string;           // Categoría del producto
  brand: string;              // Marca del producto
  images: string[];           // URLs de las imágenes
  width: number;              // Ancho del producto
  height: number;             // Alto del producto
  weight: number;             // Peso del producto
  color: string;              // Color del producto
  rating: number;             // Calificación del producto
  active: boolean;            // Estado del producto
  createdAt: Date;            // Fecha de creación
  updatedAt: Date;            // Fecha de última actualización
}

/**
 * Esquema de Mongoose para el modelo de productos
 */
const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción del producto es requerida'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El precio del producto es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    required: [true, 'El stock del producto es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'La categoría del producto es requerida'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'La marca del producto es requerida'],
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  width: {
    type: Number,
    min: [0, 'El ancho no puede ser negativo']
  },
  height: {
    type: Number,
    min: [0, 'El alto no puede ser negativo']
  },
  weight: {
    type: Number,
    min: [0, 'El peso no puede ser negativo']
  },
  color: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: [0, 'La calificación no puede ser negativa'],
    max: [5, 'La calificación máxima es 5'],
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  // Agrega automáticamente createdAt y updatedAt
});

// Índices para mejorar el rendimiento de las búsquedas
ProductSchema.index({ name: 'text', description: 'text', category: 'text', brand: 'text' });
ProductSchema.index({ category: 1, brand: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ active: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema); 