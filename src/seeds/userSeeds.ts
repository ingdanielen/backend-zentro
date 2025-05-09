import User from '../models/User';
import bcrypt from 'bcryptjs';

const userSeeds = [
  {
    email: 'admin@zentro.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    email: 'user@zentro.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user'
  }
];

export const seedUsers = async () => {
  try {
    console.log('Starting user seeding process...');
    
    // Create or update users
    for (const userData of userSeeds) {
      console.log(`Processing user: ${userData.email}`);
      
      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = await User.findOneAndUpdate(
        { email: userData.email },
        { ...userData, password: hashedPassword },
        { upsert: true, new: true }
      );
      
      console.log(`User ${userData.email} created/updated successfully`);
    }
    
    console.log('All users created/updated successfully');
    
    // Verify users were created
    const users = await User.find({});
    console.log('Total users in database:', users.length);
    users.forEach(user => {
      console.log(`User in DB: ${user.email}, Role: ${user.role}`);
    });
    
  } catch (error) {
    console.error('Error during user seeding:', error);
    throw error; // Re-throw to handle in the main application
  }
}; 