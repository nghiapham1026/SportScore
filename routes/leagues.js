const express = require('express');
const router = express.Router();
const leaguesController = require('../controllers/leagues');

// Get the list of available leagues and cups
router.get('/getLeagues', leaguesController.getLeagues);

module.exports = router;
