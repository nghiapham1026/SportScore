const express = require('express');
const router = express.Router();
const fixturesController = require('../controllers/fixtures');

router.get('/getFixtureRounds', fixturesController.getRounds);
router.get('/getFixtures', fixturesController.getFixtures);
router.get('/getFixtureHeadToHead', fixturesController.getTeamHeadToHead);
router.get('/getMatchStatistics', fixturesController.getTeamStatistics);
router.get('/getMatchEvents', fixturesController.getTeamEvents);
router.get('/getMatchLineups', fixturesController.getTeamLineups);
router.get(
  '/getMatchPlayerStatistics',
  fixturesController.getTeamPlayersStatistics
);

module.exports = router;
