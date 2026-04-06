import dotenv from 'dotenv';
import { connectDB, getMongoUri } from '../config/database';
import { seedProducts } from '../seeds/productSeeds';
import { seedUsers } from '../seeds/userSeeds';

dotenv.config();

async function main(): Promise<void> {
  if (!getMongoUri()) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }
  await connectDB();
  await seedProducts();
  await seedUsers();
  console.log('Seeds completed');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
