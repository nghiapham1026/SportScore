const venuesModel = require('../services/venues');
const Venue = require('../models/venues'); // Import the schema
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  venues: venuesModel.getVenues,
};

const getVenues = (req, res) =>
  genericHandler(endpoints.venues, req, res, 'Failed to fetch venues');

//http://localhost:3000/venues/getTeamVenues?city=manchester
const getVenuesFromDb = async (req, res) => {
  try {
    const queryParams = req.query; // Extract query parameters from the request
    const venues = await Venue.findOne({ queryParams });
    
    if (!venues) {
      return res.status(404).json({ message: 'No venues found for the provided parameters' });
    }

    res.status(200).json(venues);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getVenues,
  getVenuesFromDb,
};
