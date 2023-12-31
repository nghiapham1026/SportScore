require('dotenv').config();

const fetchData = require('../../utils/fetchData');
const Seasons = require('../../models/players/seasons'); // Adjust the import path as needed
const { apiUrl } = require('../../utils/constants');

const SEASONS_API_ENDPOINT = `${apiUrl}/players/seasons`; // Replace with the actual endpoint if different

// Function to fetch player seasons
const getPlayerSeasons = async (params, attempts = 0) => {
  const data = await fetchData(SEASONS_API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // Retry fetching data up to 2 times
      return getPlayerSeasons(params, attempts + 1);
    } else {
      return { error: 'No season data available after multiple attempts.' };
    }
  }

  // Create the document for the database
  const playerSeasonsData = {
    queryParams: params,
    seasons: data.response.map((year) => ({ year: year })), // Map the array of years to seasonSchema format
    updatedAt: Date.now(),
  };

  try {
    const existingData = await Seasons.findOne({ queryParams: params });

    if (!existingData) {
      // If no existing data, create a new document
      await Seasons.create(playerSeasonsData);
      console.log('Season data saved successfully for player ID:', params);
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Update existing document if it's older than 24 hours
      await Seasons.findOneAndReplace(
        { queryParams: params },
        playerSeasonsData
      );
      console.log('Season data updated for player ID:', params);
    }
  } catch (error) {
    console.error('Error inserting/updating season data into MongoDB:', error);
  }

  return playerSeasonsData;
};

module.exports = {
  getPlayerSeasons,
};
