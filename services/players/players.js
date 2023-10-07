require('dotenv').config();

const fetchData = require('../../utils/fetchData');
const Player = require('../../models/players/players');
const { apiUrl } = require('../../utils/constants');

const API_ENDPOINT = `${apiUrl}/players`;

const getPlayers = async (params) => {
  const data = await fetchData(API_ENDPOINT, params);

  // Process the data into the schema
  const playerData = data.response.map((item) => ({
    player: item.player,
    statistics: item.statistics,
  }));

  // Create a single object to group all the players and include the query params
  const groupedData = {
    queryParams: params,
    allPlayers: playerData,
  };

  // Save to MongoDB
  try {
    const existingData = await Player.findOne({ queryParams: params });

    if (!existingData) {
      await Player.create(groupedData);
      console.log('Data saved successfully');
    } else {
      await Player.findOneAndReplace({ queryParams: params }, groupedData);
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
