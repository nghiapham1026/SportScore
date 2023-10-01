const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');

// Get the list of available teams
router.get('/', teamsController.getTeams);

// Get the statistics of a team in relation to a given competition and season
router.get('/statistics', teamsController.getTeamStatistics);

module.exports = router;