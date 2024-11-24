const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// Route publique pour lister tous les CV
router.get('/public/cvs', cvController.getAllCvs);

router.get('/search', cvController.searchCvs);

// Routes existantes pour gérer les CV
router.get('/cvs', cvController.getAllCvs);
router.get('/cvs/:id', cvController.getCvById);
router.post('/cvs', cvController.createCv);
router.put('/cvs/:id', cvController.updateCv);
router.delete('/cvs/:id', cvController.deleteCv);

module.exports = router;
