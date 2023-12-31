const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');

router.get('/getSquads', playersController.getSquads);
router.get('/db/getSquads', playersController.getSquadsFromDb);

router.get('/getPlayers', playersController.getPlayers);
router.get('/db/getPlayers', playersController.getPlayersFromDb);

router.get('/getTopScorers', playersController.getTopScorers);
router.get('/db/getTopScorers', playersController.getTopScorersFromDb);

router.get('/getTopAssists', playersController.getTopAssists);
router.get('/db/getTopAssists', playersController.getTopAssistsFromDb);

router.get('/getSeasons', playersController.getSeasons);
router.get('/db/GetSeasons', playersController.getSeasonsFromDb);

module.exports = router;
