import Product from '../models/Product';

const productSeeds = [
  {
    name: "Smartphone XYZ",
    stock: 50,
    width: 7.5,
    height: 15.5,
    weight: 180,
    color: "Negro",
    description: "Smartphone de última generación con cámara de alta resolución y pantalla AMOLED",
    price: 699.99,
    category: "Electrónicos",
    brand: "TechBrand",
    images: "https://example.com/smartphone.jpg",
    rating: 4.5
  },
  {
    name: "Laptop Pro",
    stock: 30,
    width: 35,
    height: 25,
    weight: 1500,
    color: "Plata",
    description: "Laptop profesional con procesador de última generación y pantalla retina",
    price: 1299.99,
    category: "Computadoras",
    brand: "TechBrand",
    images: "https://example.com/laptop.jpg",
    rating: 4.8
  }
];

export const seedProducts = async () => {
  try {
    // Check if products already exist
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(productSeeds);
      console.log('Productos base creados exitosamente');
    } else {
      console.log('La base de datos ya contiene productos');
    }
  } catch (error) {
    console.error('Error al crear productos base:', error);
  }
}; 