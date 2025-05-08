/**
 * Modelo de Parámetros
 * Este modelo define la estructura de los parámetros del sistema,
 * como categorías y marcas, incluyendo sus estadísticas y contadores.
 */

import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interfaz que define la estructura de un parámetro
 */
export interface IParameter extends Document {
  type: 'category' | 'brand';  // Tipo de parámetro (categoría o marca)
  name: string;                // Nombre del parámetro
  count: number;               // Contador de uso
  lastUsed: Date;              // Fecha de último uso
  totalProducts: number;       // Total de productos asociados
  averagePrice: number;        // Precio promedio de productos
  totalStock: number;          // Stock total de productos
  createdAt: Date;             // Fecha de creación
  updatedAt: Date;             // Fecha de última actualización
}

/**
 * Esquema de Mongoose para el modelo de parámetros
 */
const ParameterSchema = new Schema<IParameter>({
  type: { 
    type: String, 
    required: true, 
    enum: ['category', 'brand'] 
  },
  name: { 
    type: String, 
    required: true 
  },
  count: { 
    type: Number, 
    default: 0 
  },
  lastUsed: { 
    type: Date, 
    default: Date.now 
  },
  totalProducts: {
    type: Number,
    default: 0
  },
  averagePrice: {
    type: Number,
    default: 0
  },
  totalStock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true  // Agrega automáticamente createdAt y updatedAt
});

// Crear índice compuesto para type y name
ParameterSchema.index({ type: 1, name: 1 }, { unique: true });

export default mongoose.model<IParameter>('Parameter', ParameterSchema); 