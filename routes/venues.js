const express = require('express');
const router = express.Router();
const venuesController = require('../controllers/venues');

router.get('/getTeamVenues', venuesController.getVenues);

module.exports = router;
