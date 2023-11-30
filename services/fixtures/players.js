require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const FixturePlayers = require('../../models/fixtures/players'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures/players`;

const getFixturePlayers = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) { // 2 here because the first call is attempt 0
      return getVenues(params, attempts + 1);
    } else {
      return { error: "Empty data after multiple attempts" };
    }
  }

  // Grouping the two datasets into a single object
  const groupedData = {
    queryParams: params,
    teams: data.response.map((item) => {
      return {
        team: item.team,
        players: item.players.map((playerItem) => ({
          player: playerItem.player,
          statistics: playerItem.statistics,
        })),
      };
    }),
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    const existingData = await FixturePlayers.findOne({ queryParams: params });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const fixturePlayersEntry = new FixturePlayers(groupedData);
      await fixturePlayersEntry.save();
      console.log('Data saved successfully');
    } else if (existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)) {
      // Replace the existing data
      await FixturePlayers.findOneAndReplace(
        { queryParams: params },
        { ...groupedData, updatedAt: Date.now() } // Update the timestamp
      );
      console.log(
        'Data already exists in the database. Existing data has been replaced with new data.'
      );
    }
  } catch (error) {
    console.error('Error interacting with MongoDB:', error);
  }

  return groupedData;
};

module.exports = {
  getFixturePlayers,
};
