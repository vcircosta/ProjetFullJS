require('dotenv').config();
const connectDB = require('./src/database'); // Vérifier la connexion MongoDB

const app = require('./src/app');
const http = require('http');

// Connexion à la base de données MongoDB avant de démarrer le serveur
connectDB().then(() => {
  const server = http.createServer(app);

  server.listen(3000, '127.0.0.1', () => {
    console.log('Server is running on localhost');
  });
}).catch((error) => {
  console.error('Erreur lors de la connexion à la base de données:', error);
});
