const standingsModel = require('../services/standings');
const Standing = require('../models/standings'); // Import the schema
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  standings: standingsModel.getStandings,
};

const getStandings = (req, res) =>
  genericHandler(endpoints.standings, req, res, 'Failed to fetch standings');

//http://localhost:3000/standings/getStandings?league=39&season=2021
const getStandingsFromDb = async (req, res) => {
  try {
    const queryParams = req.query; // Extract query parameters from the request
    const standings = await Standing.findOne({ queryParams });
    
    if (!standings) {
      return res.status(404).json({ message: 'No standings found for the provided parameters' });
    }

    res.status(200).json(standings);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getStandings,
  getStandingsFromDb,
};
