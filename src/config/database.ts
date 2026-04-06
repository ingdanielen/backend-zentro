import mongoose from 'mongoose';
import dotenv from 'dotenv';
import messages from '../constants/messages';

dotenv.config();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export function getMongoUri(): string | undefined {
  return process.env.MONGODB_URI;
}

/**
 * Conexión reutilizable entre invocaciones serverless (Vercel) y servidor local.
 */
export async function connectDB(): Promise<void> {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  if (cached.conn) {
    return;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    console.log(messages.database.MongoDBConnectedSuccessfully);
  } catch (error) {
    cached.promise = null;
    console.error(messages.database.MongoDBConnectionError, error);
    throw error;
  }
}
