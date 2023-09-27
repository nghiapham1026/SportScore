const express = require('express');
const router = express.Router();
const leaguesController = require('../controllers/leagues');

// Get the list of available leagues and cups
router.get('/', leaguesController.getLeagues);

// Get the list of available seasons for leagues
router.get('/seasons', leaguesController.getSeasons);

module.exports = router;