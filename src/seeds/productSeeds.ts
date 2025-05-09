import Product from '../models/Product';

const productSeeds = [
  {
    name: "Bicicleta Montañera Trek Marlin 5",
    stock: 3,
    width: 70.0,
    height: 110.0,
    weight: 13000,
    color: "Azul",
    description: "Bicicleta para trail con cuadro de aluminio, frenos de disco y 21 velocidades",
    price: 649.99,
    category: "Deportes",
    brand: "Trek",
    images: "https://trekperu.pe/wp-content/uploads/2024/09/madonesl6-25-46219-a-primary-be265dbd-e0b0-4878-9521-43cc9a6125ee.png"
  },
  {
    name: "El Señor de los Anillos (Trilogía)",
    stock: 30,
    width: 13.0,
    height: 20.0,
    weight: 1200,
    color: "Rojo/Dorado",
    description: "Edición especial de lujo con ilustraciones y mapas de la Tierra Media",
    price: 59.99,
    category: "Libros",
    brand: "Minotauro",
    images: "https://librosmedellin.com/wp-content/uploads/2025/02/El-senor-de-los-anillos-la-comunidad-del-anillo-J.R.R-Tolkien.webp"
  },
  {
    name: "Aspiradora Robot Xiaomi Mi Robot Vacuum-Mop 2",
    stock: 7,
    width: 35.3,
    height: 9.6,
    weight: 350,
    color: "Blanco",
    description: "Aspiradora inteligente con navegación láser, mapeo 360° y función de trapeado",
    price: 299.99,
    category: "Hogar",
    brand: "Xiaomi",
    images: "https://i02.appmifile.com/608_item_co/13/11/2024/46506f98bbda40296cbb0f7f8b8f4239!400x400!85.png"
  },
  {
    name: "Zapatillas Nike Air Jordan 1 Retro",
    stock: 12,
    width: 12.0,
    height: 6.0,
    weight: 500,
    color: "Rojo/Blanco/Negro",
    description: "Edición retro de las clásicas Air Jordan 1 con suela de goma y cuero premium",
    price: 179.99,
    category: "Moda",
    brand: "Nike",
    images: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/3df2c24e-d6d3-4a48-9b82-7a26a53a0036/fecha-de-lanzamiento-del-air-jordan-1-chicago-dz5485-612.jpg"
  },
  {
    name: "Maceta Autoriego 15L",
    stock: 24,
    width: 30.0,
    height: 25.0,
    weight: 800,
    color: "Terracota",
    description: "Maceta con sistema de autorriego y bandeja integrada para plantas medianas",
    price: 34.50,
    category: "Jardinería",
    brand: "Urbalive",
    images: "https://www.urbalive.com.pe/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/a/maceta-autoriego-15l-urbalive-1.jpg"
  },
  {
    name: "Laptop ASUS ROG Strix G17",
    stock: 10,
    width: 39.9,
    height: 2.6,
    weight: 2700,
    color: "Negro",
    description: "Laptop gamer con pantalla 17.3'' FHD 144Hz, RTX 3060, AMD Ryzen 7 6800H y 16GB RAM",
    price: 1499.99,
    category: "Tecnología",
    brand: "ASUS",
    images: "https://dlcdnwebimgs.asus.com/gain/3CD2A8C3-46A0-4BE5-B10F-1926DB7B2280"
  },
  {
    name: "Mancuernas Ajustables Bowflex SelectTech 552",
    stock: 6,
    width: 30.0,
    height: 15.0,
    weight: 12000,
    color: "Negro/Rojo",
    description: "Par de mancuernas ajustables de 5kg a 22.5kg en incrementos de 2.5kg",
    price: 399.99,
    category: "Deportes",
    brand: "Bowflex",
    images: "https://global.bowflex.com/dw/image/v2/AAYW_PRD/on/demandware.static/-/Sites-nautilus-master-catalog/default/dwfefb876f/images/bowflex/selecttech/552i/100319/bowflex-selecttech-552i-dumbbell-set.png?sw=700&sh=700&sm=fit"
  },
  {
    name: "Raqueta Wilson Pro Staff RF97",
    stock: 4,
    width: 68.6,
    height: 2.5,
    weight: 340,
    color: "Negro/Rojo",
    description: "Raqueta usada por Roger Federer, marco de grafito y cuerdas a 23kg de tensión",
    price: 249.99,
    category: "Deportes",
    brand: "Wilson",
    images: "https://wilsonstore.com.co/wp-content/uploads/2023/02/5f5916e75f8c84465e05a7d3_7e3ee7e2b23d879a63eb069fa6fb2690-4-600x600.png"
  },
  {
    name: "Purificador Dyson Pure Cool TP09",
    stock: 5,
    width: 24.5,
    height: 100.0,
    weight: 4500,
    color: "Blanco/Dorado",
    description: "Purificador con filtro HEPA y ventilador inteligente para partículas y alérgenos",
    price: 599.99,
    category: "Hogar",
    brand: "Dyson",
    images: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/hero/497043-01.png?fmt=png-alpha&scl=1&fmt=png-alpha"
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