const leaguesModel = require('../services/leagues');
const League = require('../models/leagues'); // Import the schema

const genericHandler = require('../utils/genericHandler');
const retrieveDataFromDb = require('../utils/retrieveData');

const endpoints = {
  leagues: leaguesModel.getLeagues,
};

// http://localhost:3000/leagues/getLeagues
const getLeagues = (req, res) =>
  genericHandler(endpoints.leagues, req, res, 'Failed to fetch leagues');

// http://localhost:3000/leagues/db/getLeagues
const getLeaguesFromDb = (_, res) => {
  // No query parameters are needed for this function as per the original implementation
  retrieveDataFromDb(
    League,
    {},
    res,
    'No leagues found for the provided parameters'
  );
};

module.exports = {
  getLeagues,
  getLeaguesFromDb,
};
