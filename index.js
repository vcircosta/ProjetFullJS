require('dotenv').config(); // Charger les variables d'environnement depuis .env
const connectDB = require('./src/database'); // Vérifier la connexion MongoDB
const app = require('./src/app'); // Importer l'application Express
const http = require('http'); // Créer un serveur HTTP

// Route de test pour vérifier la connexion entre le front et le back
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connexion front-back OK' });
});

// Connexion à MongoDB avant de démarrer le serveur
connectDB().then(() => {
  const server = http.createServer(app);

  // Lancer le serveur sur le port 3000
  server.listen(3000, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:3000');
  });
}).catch((error) => {
  // En cas d'erreur de connexion à MongoDB
  console.error('Erreur lors de la connexion à la base de données:', error);
});
