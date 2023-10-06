const express = require('express');
const router = express.Router();
const standingsController = require('../controllers/standings');

router.get('/getStandings', standingsController.getStandings);

// New route to get standings from the database
router.get('/db/getStandings', standingsController.getStandingsFromDb);

module.exports = router;
