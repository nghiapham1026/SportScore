require('dotenv').config();

const { apiUrl } = require('../utils/constants');
const fetchData = require('../utils/fetchData');
const GroupedPredictions = require('../models/predictions'); // Import the predictions schema

const API_ENDPOINT = `${apiUrl}/predictions`;

const getPredictions = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getPredictions(params, attempts + 1);
    } else {
      return { error: 'Empty data after multiple attempts' };
    }
  }

  // Process the data into the schema
  const predictionsData = data.response.map((item) => ({
    predictions: item.predictions,
    league: item.league,
    teams: item.teams,
    comparison: item.comparison,
    h2h: item.h2h,
  }));

  // Create a single object to group all the predictions and include the query params
  const groupedData = {
    queryParams: params,
    allPredictions: predictionsData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Check if data already exists in MongoDB
  try {
    const existingData = await GroupedPredictions.findOne({
      queryParams: params,
    });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const predictionsGroup = new GroupedPredictions(groupedData);
      await predictionsGroup.save();
      console.log('Data saved successfully');
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Replace the existing data
      await GroupedPredictions.findOneAndReplace(
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
  getPredictions,
};
