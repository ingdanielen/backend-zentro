import dotenv from 'dotenv';
import { connectDB, getMongoUri } from './config/database';
import app from './app';
import { seedProducts } from './seeds/productSeeds';
import { seedUsers } from './seeds/userSeeds';

dotenv.config();

async function main(): Promise<void> {
  if (!getMongoUri()) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  await connectDB();

  if (process.env.RUN_SEEDS !== 'false') {
    await seedProducts();
    await seedUsers();
    console.log('Initial data seeded successfully');
  }

  const PORT = process.env.PORT || 3000;
  app.listen(Number(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error('Error during initialization:', error);
  process.exit(1);
});
