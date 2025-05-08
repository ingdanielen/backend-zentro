# Zentro Backend

Este es el servicio backend para la aplicación Zentro, construido con Node.js, Express y TypeScript.

## Estructura del Proyecto

```
zentro-backend/
├── src/
│   ├── config/         # Archivos de configuración
│   ├── controllers/    # Controladores de rutas
│   ├── lib/           # Funciones de utilidad y código compartido
│   ├── models/        # Modelos de base de datos
│   ├── routes/        # Rutas de la API
│   └── index.ts       # Punto de entrada de la aplicación
├── .env               # Variables de entorno
├── package.json       # Dependencias y scripts del proyecto
└── tsconfig.json     # Configuración de TypeScript
```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **TypeScript**: Lenguaje de programación
- **MongoDB**: Base de datos
- **Mongoose**: Modelado de objetos MongoDB
- **Cloudinary**: Almacenamiento en la nube para archivos multimedia
- **Zod**: Validación de esquemas
- **CORS**: Intercambio de recursos entre orígenes
- **dotenv**: Gestión de variables de entorno

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Configuración

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en el directorio raíz con las siguientes variables:
   ```
   PORT=3000
   MONGODB_URI=tu_cadena_de_conexion_mongodb
   ```

## Scripts Disponibles

- `npm start`: Iniciar el servidor en producción
- `npm run dev`: Iniciar el servidor de desarrollo con recarga automática

## Endpoints de la API

### Rutas de Productos
- `GET /api/items`: Buscar productos con filtros
- `GET /api/items/:id`: Obtener producto por ID
- `POST /api/items`: Crear nuevo producto
- `PUT /api/items/:id`: Actualizar producto existente

### Rutas de Parámetros
- `GET /api/parameters`: Obtener todos los parámetros o filtrar por tipo
- `GET /api/search`: Obtener parámetros para búsqueda (categorías y marcas)
- `POST /api/parameters/update`: Actualizar conteo de parámetros

## Desarrollo

El proyecto utiliza TypeScript para mayor seguridad de tipos y mejor experiencia de desarrollo. El servidor de desarrollo incluye recarga automática para ciclos de desarrollo más rápidos.

## Base de Datos

La aplicación utiliza MongoDB como base de datos. La conexión se configura en `src/config/database.ts`. Asegúrate de configurar tu cadena de conexión de MongoDB en el archivo `.env`.

## Seguridad

- CORS está habilitado para solicitudes entre orígenes
- Se utilizan variables de entorno para configuración sensible
- La validación de entrada se implementa usando Zod

## Mejoras Futuras

- Agregar autenticación y autorización
- Implementar límite de tasa de solicitudes
- Agregar validación de solicitudes
- Configurar registro de eventos
- Agregar infraestructura de pruebas
- Implementar middleware de manejo de errores
- Agregar documentación de API usando Swagger/OpenAPI 