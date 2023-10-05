const NodeCache = require('node-cache');

// Create a new cache instance with optional settings
// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

module.exports = cache;
