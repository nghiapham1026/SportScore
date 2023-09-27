const express = require('express');
const router = express.Router();
const fixturesController = require('../controllers/fixtures');

router.get('/rounds', fixturesController.getRounds);
router.get('/', fixturesController.getFixtures);
router.get('/headtohead', fixturesController.getTeamHeadToHead);
router.get('/statistics', fixturesController.getTeamStatistics);
router.get('/events', fixturesController.getTeamEvents);
router.get('/lineups', fixturesController.getTeamLineups);
router.get('/players', fixturesController.getTeamPlayersStatistics);

module.exports = router;
