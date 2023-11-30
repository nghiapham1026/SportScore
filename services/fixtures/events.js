require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const GroupedFixtureEvents = require('../../models/fixtures/events'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/events`;

const getFixtureEvents = async (params, attempts = 0) => {
  const data = await fetchData(API_ENDPOINT, params);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) { // 2 here because the first call is attempt 0
      return getVenues(params, attempts + 1);
    } else {
      return { error: "Empty data after multiple attempts" };
    }
  }

  // Process the data into the schema
  const fixtureEventsData = data.response.map((item) => ({
    time: item.time,
    team: item.team,
    player: item.player,
    assist: item.assist,
    type: item.type,
    detail: item.detail,
    comments: item.comments,
  }));

  // Create a single object to group all the fixture events and include the query params
  const groupedData = {
    queryParams: params,
    allFixtureEvents: fixtureEventsData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Check if data already exists in MongoDB
  try {
    const existingData = await GroupedFixtureEvents.findOne({
      queryParams: params,
    });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const fixtureEventsGroup = new GroupedFixtureEvents(groupedData);
      await fixtureEventsGroup.save();
      console.log('Data saved successfully');
    } else if (existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)) {
      // Replace the existing data
      await GroupedFixtureEvents.findOneAndReplace(
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

  return fixtureEventsData;
};

module.exports = {
  getFixtureEvents,
};
