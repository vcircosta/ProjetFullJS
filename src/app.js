require('dotenv').config();
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const apiRouter = require('./routes/cvRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'CV API',
            version: '1.0.0',
        },
        servers: [
            { url: process.env.SERVER_URL || 'http://localhost:3000/' },
        ],
    },
    apis: ['./src/routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Test route
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Routes directes
app.use('/', apiRouter);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

module.exports = app;
