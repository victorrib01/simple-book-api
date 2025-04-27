import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Book API',
      version: '1.0.0',
      description: 'API para gerenciar livros',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Vai ler os comentários das rotas!
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
