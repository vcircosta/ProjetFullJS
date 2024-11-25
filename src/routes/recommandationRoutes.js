const express = require('express');
const router = express.Router();

// Définissez vos routes pour les recommandations ici
router.get('/', (req, res) => {
  res.send('Route /recommendations définie');
});

module.exports = router;