import mongoose from 'mongoose';
import dotenv from 'dotenv';
import messages from '../constants/messages';
dotenv.config();

// Use Render's MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(messages.database.MongoDBConnectedSuccessfully);
  } catch (error) {
    console.error(messages.database.MongoDBConnectionError, error);
    process.exit(1);
  }
}; 