const express = require('express');
const { ParseServer } = require('parse-server');
const router = express.Router();
require("dotenv").config();

const parseServer = new ParseServer({
  databaseURI: process.env.DB,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
});

// Mount Parse Server middleware at /parse
router.use('/parse', parseServer.app); // Note the .app to get the Express app inside the ParseServer instance

module.exports = router;
