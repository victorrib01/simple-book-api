const express = require('express');
const cors = require('cors');
const bookRoutesV1 = require('./routes/v1/book.routes');
const authRoutesV1 = require('./routes/v1/auth.routes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');


const app = express();

// Middlewares globais
app.use(express.json());
app.use(logger);
app.use(cors());

// Rotas Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/api/v1/auth', authRoutesV1);
app.use('/api/v1/books', bookRoutesV1);

// Healthcheck (vamos adicionar já no próximo passo)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

// Middleware de tratamento de erros
app.use(errorHandler);


module.exports = app;
