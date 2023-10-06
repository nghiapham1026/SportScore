const standingsModel = require('../services/standings');
const Standing = require('../models/standings'); // Import the schema

const retrieveDataFromDb = require('../utils/retrieveData');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  standings: standingsModel.getStandings,
};

const getStandings = (req, res) =>
  genericHandler(endpoints.standings, req, res, 'Failed to fetch standings');

//http://localhost:3000/standings/getStandings?league=39&season=2021
const getStandingsFromDb = (req, res) => {
  const queryParams = req.query; // Extract query parameters from the request
  retrieveDataFromDb(Standing, queryParams, res, 'No standings found for the provided parameters');
};

module.exports = {
  getStandings,
  getStandingsFromDb,
};