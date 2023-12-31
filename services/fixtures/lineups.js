require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const GroupedFixtureLineups = require('../../models/fixtures/lineups'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures/lineups`;

const getFixtureLineups = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getFixtureLineups(params, attempts + 1);
    } else {
      return { error: 'Empty data after multiple attempts' };
    }
  }

  // Process the data into the schema
  const fixtureLineupsData = data.response.map((item) => ({
    team: item.team,
    formation: item.formation,
    startXI: item.startXI.map((playerItem) => playerItem.player),
    substitutes: item.substitutes.map((playerItem) => playerItem.player),
    coach: item.coach,
  }));

  // Create a single object to group all the fixture lineups and include the query params
  const groupedData = {
    queryParams: params,
    allFixtureLineups: fixtureLineupsData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    const existingData = await GroupedFixtureLineups.findOne({
      queryParams: params,
    });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const fixtureLineupsGroup = new GroupedFixtureLineups(groupedData);
      await fixtureLineupsGroup.save();
      console.log('Data saved successfully');
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Replace the existing data
      await GroupedFixtureLineups.findOneAndReplace(
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

  return fixtureLineupsData;
};

module.exports = {
  getFixtureLineups,
};
