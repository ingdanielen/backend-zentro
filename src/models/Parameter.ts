import mongoose, { Document, Schema } from 'mongoose';

export interface IParameter extends Document {
  type: 'category' | 'brand';
  name: string;
  count: number;
  lastUsed: Date;
  totalProducts: number;
  averagePrice: number;
  totalStock: number;
  createdAt: Date;
  updatedAt: Date;
}

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
  timestamps: true
});

// Create compound index for type and name
ParameterSchema.index({ type: 1, name: 1 }, { unique: true });

export default mongoose.model<IParameter>('Parameter', ParameterSchema); 