require('dotenv').config();

const fetchData = require('../../utils/fetchData');
const Squad = require('../../models/players/squads');
const { apiUrl } = require('../../utils/constants');

const API_ENDPOINT = `${apiUrl}/players/squads`;

const getSquads = async (params) => {
  const data = await fetchData(API_ENDPOINT, params);

  const squadData = data.response.map((item) => ({
    team: item.team,
    players: item.players,
  }));

  const groupedData = {
    queryParams: params,
    allSquads: squadData,
    updatedAt: Date.now(),  // Set the updatedAt timestamp
  };

  try {
    const existingData = await Squad.findOne({ queryParams: params });

    if (!existingData) {
      await Squad.create(groupedData);
      console.log('Data saved successfully');
    } else {
      await Squad.findOneAndReplace(
        { queryParams: params },
        {...groupedData, updatedAt: Date.now()}  // Update the timestamp
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
  getSquads,
};
