const venuesModel = require('../services/venues');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  venues: venuesModel.getVenues,
};

const getVenues = (req, res) =>
  genericHandler(endpoints.venues, req, res, 'Failed to fetch venues');

module.exports = {
  getVenues,
};
