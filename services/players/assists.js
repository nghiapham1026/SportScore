require('dotenv').config();

const fetchData = require('../../utils/fetchData');
const Assist = require('../../models/players/assists'); // Update path if needed
const { apiUrl } = require('../../utils/constants');

const API_ENDPOINT = `${apiUrl}/players/topassists`; // Update endpoint if needed

const getAssists = async (params) => {
  const data = await fetchData(API_ENDPOINT, params);

  const assistData = data.response.map((item) => ({
    player: item.player,
    statistics: item.statistics,
  }));

  const groupedData = {
    queryParams: params,
    allAssists: assistData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  if (!Array.isArray(groupedData.allAssists)) {
    return { error: "Empty data" };
  }

  try {
    const existingData = await Assist.findOne({ queryParams: params });

    if (!existingData) {
      await Assist.create(groupedData);
      console.log('Data saved successfully');
    } else if (existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)) {
      await Assist.findOneAndReplace(
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
  getAssists,
};
