require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const GroupedFixtureEvents = require('../../models/fixtures/events'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/events`;

const getFixtureEvents = async (params) => {
  const data = await fetchData(API_ENDPOINT, params);

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
  };

  // Check if data already exists in MongoDB
  try {
    // Check for existing data using the query params
    const existingData = await GroupedFixtureEvents.findOne({
      queryParams: params,
    });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const fixtureEventsGroup = new GroupedFixtureEvents(groupedData);
      await fixtureEventsGroup.save();
      console.log('Data saved successfully');
    } else {
      // Replace the existing data
      await GroupedFixtureEvents.findOneAndReplace(
        {
          queryParams: params,
        },
        groupedData
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
