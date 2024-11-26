const express = require('express');
const { createCV, updateCV, deleteCV, getCVs } = require('../controllers/cvController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Route pour créer un CV (protection avec JWT)
router.post('/', authMiddleware, createCV);

// Route pour mettre à jour un CV (protection avec JWT)
router.put('/:cvId', authMiddleware, updateCV);

// Route pour supprimer un CV (protection avec JWT)
router.delete('/:cvId', authMiddleware, deleteCV);

// Route pour obtenir tous les CV (publique)
router.get('/', getCVs);

module.exports = router;
