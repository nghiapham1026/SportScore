require('dotenv').config();

const { apiUrl } = require('../utils/constants');
const fetchData = require('../utils/fetchData');
const LeagueStanding = require('../models/standings'); // Import the modified schema

const API_ENDPOINT = `${apiUrl}/standings`;

const getStandings = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getStandings(params, attempts + 1);
    } else {
      return { error: 'Empty data after multiple attempts' };
    }
  }

  // Process the data into the schema
  const standingData = data.response.map((item) => ({
    league: {
      id: item.league.id,
      name: item.league.name,
      country: item.league.country,
      logo: item.league.logo,
      flag: item.league.flag,
      season: item.league.season,
    },
    standings: item.league.standings,
  }));

  // Create a single object to group all the standings and include the query params
  const groupedData = {
    queryParams: params,
    ...standingData[0], // assuming standingData always has at least one item
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    // Check for existing data using queryParams as a unique identifier
    const existingData = await LeagueStanding.findOne({ queryParams: params });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      await LeagueStanding.create(groupedData);
      console.log('Data saved successfully');
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Replace the existing data
      await LeagueStanding.findOneAndReplace(
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

  return groupedData; // Return the grouped data
};

module.exports = {
  getStandings,
};
