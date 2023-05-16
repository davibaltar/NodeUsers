import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './database/config';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

dotenv.config();

export const server: Express = express();

// Middlewares
server.use(express.static('public'));
server.use(cors());
server.use(express.json());

// Rutas
server.use(router);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// Base de datos
dbConnection();

server.listen(process.env.PORT, () => {
  console.log('Servidor en ejecución en puerto ' + process.env.PORT);
});
