const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// Routes pour les CV
router.get('/cvs', cvController.getAllCvs);
router.get('/cvs/:id', cvController.getCvById);
router.post('/cvs', cvController.createCv);
router.put('/cvs/:id', cvController.updateCv);
router.delete('/cvs/:id', cvController.deleteCv);

module.exports = router;
