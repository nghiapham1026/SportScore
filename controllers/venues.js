const venuesModel = require('../services/venues');
const Venue = require('../models/venues'); // Import the schema

const retrieveDataFromDb = require('../utils/retrieveData');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  venues: venuesModel.getVenues,
};

const getVenues = (req, res) =>
  genericHandler(endpoints.venues, req, res, 'Failed to fetch venues');

//http://localhost:3000/venues/getTeamVenues?city=manchester
const getVenuesFromDb = (req, res) => {
  const queryParams = req.query; // Extract query parameters from the request
  retrieveDataFromDb(
    Venue,
    queryParams,
    res,
    'No venues found for the provided parameters'
  );
};

module.exports = {
  getVenues,
  getVenuesFromDb,
};
