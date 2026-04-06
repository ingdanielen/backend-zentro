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

const CONNECTED = 1;
const CONNECTING = 2;
const DISCONNECTED = 0;
const DISCONNECTING = 3;

/**
 * Conexión reutilizable entre invocaciones serverless (Vercel) y servidor local.
 * Usa readyState: en serverless la conexión en caché puede haberse cerrado.
 */
export async function connectDB(): Promise<void> {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  if (mongoose.connection.readyState === CONNECTED) {
    return;
  }

  if (mongoose.connection.readyState === CONNECTING && cached.promise) {
    await cached.promise;
    return;
  }

  if (mongoose.connection.readyState === DISCONNECTED || mongoose.connection.readyState === DISCONNECTING) {
    cached.promise = null;
    cached.conn = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    console.log(messages.database.MongoDBConnectedSuccessfully);
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error(messages.database.MongoDBConnectionError, error);
    throw error;
  }
}
