import express, { json } from 'express';
import cors from 'cors';
import bookRoutesV1 from './routes/v1/book.routes';
import authRoutesV1 from './routes/v1/auth.routes';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig';


const app = express();

// Middlewares globais
app.use(json());
app.use(logger);
app.use(cors());

// Rotas Swagger
app.use('/api-docs', serve, setup(swaggerSpec));

// Rotas
app.use('/api/v1/auth', authRoutesV1);
app.use('/api/v1/books', bookRoutesV1);

// Healthcheck (vamos adicionar já no próximo passo)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

// Middleware de tratamento de erros
app.use(errorHandler);


export default app;
