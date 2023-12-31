const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news');

router.post('', newsController.createNews);
router.get('/fetchNews', newsController.fetchNews);
router.get('/saveNews', newsController.saveNews);

module.exports = router;
