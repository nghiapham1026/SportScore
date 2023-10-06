const express = require('express');
const router = express.Router();
const venuesController = require('../controllers/venues');

router.get('/getTeamVenues', venuesController.getVenues);

// New route to get venues from the database
router.get('/db/getTeamVenues', venuesController.getVenuesFromDb);

module.exports = router;