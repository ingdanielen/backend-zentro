import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  active: boolean;
  name: string;
  createdAt: Date;
  stock: number;
  width: number;
  height: number;
  weight: number;
  color: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string;
  rating: number;
}

const ProductSchema = new Schema<IProduct>({
  active: { type: Boolean, default: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  stock: { type: Number, required: true, min: 0 },
  width: { type: Number, required: true, min: 0 },
  height: { type: Number, required: true, min: 0 },
  weight: { type: Number, required: true, min: 0 },
  color: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  images: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 }
});

// Create indexes for better search performance
ProductSchema.index({ name: 'text', description: 'text', brand: 'text', category: 'text' });

export default mongoose.model<IProduct>('Product', ProductSchema); 