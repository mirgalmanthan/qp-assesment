import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Grocery API Documentation',
            version: '1.0.0',
            description: 'API documentation for the Grocery Store Management System',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routers/*.ts', './src/controllers/**/*.ts'], // Updated path to match folder name
};

export const swaggerSpec = swaggerJsdoc(options);
