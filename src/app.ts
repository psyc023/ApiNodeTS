import express from 'express';
import personRoutes from './routes/personRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import sequelize from './config/database';

const app = express();

app.use(express.json());
app.use('/api', personRoutes);

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Personas',
      version: '1.0.0',
      description: 'Una API para gestionar personas',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto según la URL de tu servidor
      },
    ],
  },
  apis: ['./routes/*.ts'], // Rutas de tu aplicación que quieres documentar
};

const specs = swaggerJsdoc(options);

// Monta Swagger en tu aplicación Express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('No se pudo sincronizar la base de datos:', error);
  }
};

startServer();

export default app;
