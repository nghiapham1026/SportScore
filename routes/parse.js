const express = require('express');
const { ParseServer } = require('parse-server');
const router = express.Router();
require("dotenv").config();

const parseServer = new ParseServer({
  databaseURI: process.env.DB,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
  loggerAdapter: {
    log: (level, message, data) => {
      console.log(`[${level}] ${message}`, data);
    },
    error: (message, data) => {
      console.error(`[ERROR] ${message}`, data);
    }
  }
});

// Log Parse Server initialization
console.log(`Parse Server running at ${process.env.SERVER_URL}`);

// Mount Parse Server middleware at /parse
router.use('/parse', parseServer.app);

module.exports = router;
