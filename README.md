# Zentro Backend

This is the backend service for the Zentro application, built with Node.js, Express, and TypeScript.

## Project Structure

```
zentro-backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── lib/           # Utility functions and shared code
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── index.ts       # Application entry point
├── .env               # Environment variables
├── package.json       # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Programming language
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **Cloudinary**: Cloud storage for media files
- **Zod**: Schema validation
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload

## API Endpoints

The API is currently under development. The following endpoints are planned:

- `GET /`: Welcome message
- More endpoints will be added as the project develops

## Development

The project uses TypeScript for type safety and better development experience. The development server includes hot reloading for faster development cycles.

## Database

The application uses MongoDB as its database. The connection is configured in `src/config/database.ts`. Make sure to set up your MongoDB connection string in the `.env` file.

## Security

- CORS is enabled for cross-origin requests
- Environment variables are used for sensitive configuration
- Input validation will be implemented using Zod

## Future Improvements

- Add authentication and authorization
- Implement rate limiting
- Add request validation
- Set up logging
- Add testing infrastructure
- Implement error handling middleware
- Add API documentation using Swagger/OpenAPI 