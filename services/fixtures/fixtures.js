require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const GroupedFixture = require('../../models/fixtures/fixtures'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures`;

const getFixtures = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getFixtures(params, attempts + 1);
    } else {
      return { error: 'Empty data after multiple attempts' };
    }
  }

  // Filter data based on the league IDs
  const filteredData = data.response.filter((item) =>
    [
      4, 61, 39, 78, 135, 140, 1, 2, 66, 81, 45, 48, 253, 3, 137, 143, 848,
    ].includes(item.league.id)
  );

  // Process the filtered data into the schema
  const fixtureData = filteredData.map((item) => ({
    fixture: item.fixture,
    league: item.league,
    teams: item.teams,
    goals: item.goals,
    score: item.score,
  }));

  // Create a single object to group all the fixtures and include the query params
  const groupedData = {
    queryParams: params,
    allFixtures: fixtureData,
  };

  // Check if data already exists in MongoDB
  try {
    const existingData = await GroupedFixture.findOne({ queryParams: params });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const fixtureGroup = new GroupedFixture(groupedData);
      fixtureGroup.updatedAt = Date.now(); // Update the timestamp
      await fixtureGroup.save();
      console.log('Data saved successfully');
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Replace the existing data
      await GroupedFixture.findOneAndReplace(
        { queryParams: params },
        { ...groupedData, updatedAt: Date.now() }
      );
      console.log(
        'Data already exists in the database. Existing data has been replaced with new data.'
      );
    }
  } catch (error) {
    console.error('Error interacting with MongoDB:', error);
  }

  return fixtureData;
};

const getRounds = async (params) => {
  return await fetchData(`${API_ENDPOINT}/rounds`, params);
};

module.exports = {
  getRounds,
  getFixtures,
};
