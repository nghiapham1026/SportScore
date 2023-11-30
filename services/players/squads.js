require('dotenv').config();

const fetchData = require('../../utils/fetchData');
const Squad = require('../../models/players/squads');
const { apiUrl } = require('../../utils/constants');

const API_ENDPOINT = `${apiUrl}/players/squads`;

const getSquads = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) { // 2 here because the first call is attempt 0
      return getVenues(params, attempts + 1);
    } else {
      return { error: "Empty data after multiple attempts" };
    }
  }

  const squadData = data.response.map((item) => ({
    team: item.team,
    players: item.players,
  }));

  const groupedData = {
    queryParams: params,
    allSquads: squadData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  try {
    const existingData = await Squad.findOne({ queryParams: params });

    if (!existingData) {
      await Squad.create(groupedData);
      console.log('Data saved successfully');
    } else if (existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)) {
      await Squad.findOneAndReplace(
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
  getSquads,
};
