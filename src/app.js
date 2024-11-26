require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const connectDB = require('./database'); // Connexion à la base de données
const apiRouter = require('./routes/cvRoutes');
const authMiddleware = require('./middleware/auth'); // Middleware d'authentification

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB (utilisez la fonction importée depuis le fichier database.js)
connectDB();

// Swagger Documentation
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

// Routes directes (non protégées)
app.use('/cvs', apiRouter);

// Routes protégées par authentification
app.use('/users', require('./routes/usersRoutes'));
app.use('/recommendations', authMiddleware, require('./routes/recommendationRoutes'));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Gestion des routes non définies
app.use((req, res) => {
  res.status(404).send("Désolé, cette route n'existe pas");
});

module.exports = app;
