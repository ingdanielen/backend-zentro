import User from '../models/User';

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
    // Check if users already exist
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany(userSeeds);
      console.log('Users creados exitosamente');
    } else {
      console.log('La base de datos ya contiene usuarios');
    }
  } catch (error) {
    console.error('Error al crear usuarios:', error);
  }
}; 