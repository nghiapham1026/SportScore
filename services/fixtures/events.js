require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const GroupedFixtureEvents = require('../../models/fixtures/events'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/events`;

const getFixtureEvents = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const fixtureEventsData = data.response.map(item => ({
        time: item.time,
        team: item.team,
        player: item.player,
        assist: item.assist,
        type: item.type,
        detail: item.detail,
        comments: item.comments
    }));

    // Create a single object to group all the fixture events
    const groupedData = {
        allFixtureEvents: fixtureEventsData
    };

    // Save to MongoDB
    try {
        const fixtureEventsGroup = new GroupedFixtureEvents(groupedData);
        await fixtureEventsGroup.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return fixtureEventsData;
};

module.exports = {
    getFixtureEvents
};