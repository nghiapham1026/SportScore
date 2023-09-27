const express = require('express');
const router = express.Router();
const standingsController = require('../controllers/standings');

router.get('/', standingsController.getStandings);

module.exports = router;