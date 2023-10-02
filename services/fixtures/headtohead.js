require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const groupedHeadToHeadFixtureSchema = require('../../models/fixtures/headtohead'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/headtohead`;

const getHeadToHeadFixtures = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const headToHeadFixtureData = data.response.map(item => ({
        fixture: item.fixture,
        league: item.league,
        teams: item.teams,
        goals: item.goals,
        score: item.score
    }));

    // Create a single object to group all the head-to-head fixtures
    const groupedData = {
        allHeadToHeadFixtures: headToHeadFixtureData
    };

    // Save to MongoDB
    try {
        const headToHeadFixtureGroup = new groupedHeadToHeadFixtureSchema(groupedData);
        await headToHeadFixtureGroup.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return headToHeadFixtureData;
};

module.exports = {
    getHeadToHeadFixtures
};