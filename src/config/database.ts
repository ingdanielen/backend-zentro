import mongoose from 'mongoose';
import dotenv from 'dotenv';
import messages from '../constants/messages';
dotenv.config();

// Use Railway's MongoDB connection URL
const MONGODB_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/zentro';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(messages.database.MongoDBConnectedSuccessfully);
  } catch (error) {
    console.error(messages.database.MongoDBConnectionError, error);
    process.exit(1);
  }
}; 