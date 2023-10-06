const leaguesModel = require('../services/leagues');
const League = require('../models/leagues'); // Import the schema
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  leagues: leaguesModel.getLeagues,
};

const getLeagues = (req, res) =>
  genericHandler(endpoints.leagues, req, res, 'Failed to fetch leagues');

const getLeaguesFromDb = async (req, res) => {
  try {
    const queryParams = req.query; // Extract query parameters from the request
    const leagues = await League.findOne({ queryParams });
    
    if (!leagues) {
      return res.status(404).json({ message: 'No leagues found for the provided parameters' });
    }

    res.status(200).json(leagues);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getLeagues,
  getLeaguesFromDb,
};
