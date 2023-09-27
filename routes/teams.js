const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');

// Get the list of available teams
router.get('/', teamsController.getTeams);

// Get the statistics of a team in relation to a given competition and season
router.get('/statistics', teamsController.getTeamStatistics);

// Get the list of seasons available for a team
router.get('/seasons', teamsController.getTeamSeasons);

// Get the list of countries available for the teams endpoint
router.get('/countries', teamsController.getTeamCountries);

module.exports = router;