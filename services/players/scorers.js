require('dotenv').config();

const fetchData = require('../../utils/fetchData');
const Scorer = require('../../models/players/scorers');
const { apiUrl } = require('../../utils/constants');

const API_ENDPOINT = `${apiUrl}/players/topscorers`;

const getTopScorers = async (params) => {
  const data = await fetchData(API_ENDPOINT, params);

  const scorerData = data.response.map((item) => ({
    player: item.player,
    statistics: item.statistics,
  }));

  const groupedData = {
    queryParams: params,
    topScorers: scorerData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  try {
    const existingData = await Scorer.findOne({ queryParams: params });

    if (!existingData) {
      await Scorer.create(groupedData);
      console.log('Data saved successfully');
    } else {
      await Scorer.findOneAndReplace(
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
  getTopScorers,
};
