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
    // Create or update users
    for (const userData of userSeeds) {
      await User.findOneAndUpdate(
        { email: userData.email },
        userData,
        { upsert: true, new: true }
      );
    }
    console.log('Users creados/actualizados exitosamente');
  } catch (error) {
    console.error('Error al crear/actualizar usuarios:', error);
  }
}; 