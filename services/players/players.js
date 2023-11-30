require('dotenv').config();

const fetchData = require('../../utils/fetchData');
const Player = require('../../models/players/players');
const { apiUrl } = require('../../utils/constants');

const API_ENDPOINT = `${apiUrl}/players`;

const getPlayers = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) { // 2 here because the first call is attempt 0
      return getVenues(params, attempts + 1);
    } else {
      return { error: "Empty data after multiple attempts" };
    }
  }

  // Process the data into the schema
  const playerData = data.response.map((item) => ({
    player: item.player,
    statistics: item.statistics,
  }));

  // Create a single object to group all the players and include the query params
  const groupedData = {
    queryParams: params,
    allPlayers: playerData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    const existingData = await Player.findOne({ queryParams: params });

    if (!existingData) {
      await Player.create(groupedData);
      console.log('Data saved successfully');
    } else if (existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)) {
      await Player.findOneAndReplace(
        { queryParams: params },
        { ...groupedData, updatedAt: Date.now() } // Update the timestamp
      );
      console.log(
        'Data already exists in the database. Existing data has been replaced with new data.'
      );
    }
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  }

  return groupedData;
};

module.exports = {
  getPlayers,
};
