require('dotenv').config();

const { apiUrl } = require('../utils/constants');
const fetchData = require('../utils/fetchData');
const League = require('../models/leagues'); // Import the schema

const API_ENDPOINT = `${apiUrl}/leagues`;

const getLeagues = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getLeagues(params, attempts + 1);
    } else {
      return { error: 'Empty data after multiple attempts' };
    }
  }

  // Process the data into the schema
  const leagueData = data.response.map((item) => ({
    league: item.league,
    country: item.country,
    seasons: item.seasons,
  }));

  // Filter the data for specific league IDs
  const filteredLeagueData = leagueData.filter((item) =>
    [
      4, 61, 39, 78, 135, 140, 1, 2, 66, 81, 45, 48, 253, 3, 137, 143, 848,
    ].includes(item.league.id)
  );

  // Create a single object to group all the leagues
  const groupedData = {
    allLeagues: filteredLeagueData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    // Check for existing data using league.id as a unique identifier
    const existingData = await League.findOne({
      'allLeagues.league.id': {
        $in: groupedData.allLeagues.map((l) => l.league.id),
      },
    });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const leagueGroup = new League(groupedData);
      await leagueGroup.save();
      console.log('Data saved successfully');
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Replace the existing data
      await League.findOneAndReplace(
        {
          'allLeagues.league.id': {
            $in: groupedData.allLeagues.map((l) => l.league.id),
          },
        },
        { ...groupedData, updatedAt: Date.now() } // Update the timestamp
      );
      console.log(
        'Data already exists in the database. Existing data has been replaced with new data.'
      );
    }
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  }

  return filteredLeagueData;
};

module.exports = {
  getLeagues,
};
