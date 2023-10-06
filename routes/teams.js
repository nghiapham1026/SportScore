const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');

// Get the list of available teams
router.get('/getTeams', teamsController.getTeams);

// Get the statistics of a team in relation to a given competition and season
router.get('/getTeamSeasonStatistics', teamsController.getTeamStatistics);

// New route to get teams from the database
router.get('/db/getTeams', teamsController.getTeamsFromDb);

module.exports = router;
