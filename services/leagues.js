require('dotenv').config();

const { apiUrl } = require('../utils/constants');
const fetchData = require('../utils/fetchData');
const League = require('../models/leagues'); // Import the schema

const API_ENDPOINT = `${apiUrl}/leagues`;

const getLeagues = async (params) => {
  const data = await fetchData(API_ENDPOINT, params);

  // Process the data into the schema
  const leagueData = data.response.map((item) => ({
    league: item.league,
    country: item.country,
    seasons: item.seasons,
  }));

  // Filter the data for specific league IDs
  const filteredLeagueData = leagueData.filter((item) =>
    [
      39, 140, 135, 78, 61, 2, 3, 848, 143, 45, 48, 528, 556, 81, 529, 531, 547,
      137, 22, 37, 66, 5, 4, 32, 960, 253, 772, 257, 536, 16, 536, 307, 17, 1,
      29, 30, 31, 32, 33, 34, 340,
    ].includes(item.league.id)
  );

  // Create a single object to group all the leagues
  const groupedData = {
    allLeagues: filteredLeagueData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  if (!Array.isArray(groupedData.allLeagues)) {
    return { error: "Empty data" };
  }

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
    } else if (existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)) {
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
