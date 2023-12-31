require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const GroupedFixtureStatistics = require('../../models/fixtures/statistics'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures/statistics`;

const getFixtureStatistics = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getFixtureStatistics(params, attempts + 1);
    } else {
      return { error: 'Empty data after multiple attempts' };
    }
  }

  // Process the data into the schema
  const fixtureStatisticsData = data.response.map((item) => ({
    team: item.team,
    statistics: item.statistics,
  }));

  // Create a single object to group all the fixture statistics and include the query params
  const groupedData = {
    queryParams: params,
    allFixtureStatistics: fixtureStatisticsData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    const existingData = await GroupedFixtureStatistics.findOne({
      queryParams: params,
    });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const fixtureStatisticsGroup = new GroupedFixtureStatistics(groupedData);
      await fixtureStatisticsGroup.save();
      console.log('Data saved successfully');
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Replace the existing data
      await GroupedFixtureStatistics.findOneAndReplace(
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

  return fixtureStatisticsData;
};

module.exports = {
  getFixtureStatistics,
};
