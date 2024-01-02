const venuesModel = require('../services/venues');
const Venue = require('../models/venues'); // Import the schema

const { retrieveDataFromDb } = require('../utils/retrieveData');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  venues: venuesModel.getVenues,
};

// http://localhost:3000/venues/getTeamVenues?city=manchester
const getVenues = (req, res) =>
  genericHandler(endpoints.venues, req, res, 'Failed to fetch venues');

// http://localhost:3000/venues/db/getTeamVenues?city=manchester
const getVenuesFromDb = (req, res) => {
  retrieveDataFromDb(
    Venue,
    venuesModel.getVenues,
    req.query,
    res,
    'No venues found for the provided parameters'
  );
};

module.exports = {
  getVenues,
  getVenuesFromDb,
};
