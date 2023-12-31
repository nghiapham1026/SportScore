const express = require('express');
const router = express.Router();
const predictionsController = require('../controllers/predictions');

// Existing routes
router.get('/getPredictions', predictionsController.getPredictions);

// New routes for fetching data from the database
router.get('/db/getPredictions', predictionsController.getPredictionsFromDb);

module.exports = router;
