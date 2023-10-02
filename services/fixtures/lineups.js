require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const GroupedFixtureLineups = require('../../models/fixtures/lineups'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/lineups`;

const getFixtureLineups = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const fixtureLineupsData = data.response.map(item => ({
        team: item.team,
        formation: item.formation,
        startXI: item.startXI.map(playerItem => playerItem.player),
        substitutes: item.substitutes.map(playerItem => playerItem.player),
        coach: item.coach
    }));

    // Create a single object to group all the fixture lineups
    const groupedData = {
        allFixtureLineups: fixtureLineupsData
    };

    // Save to MongoDB
    try {
        const fixtureLineupsGroup = new GroupedFixtureLineups(groupedData);
        await fixtureLineupsGroup.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return fixtureLineupsData;
};

module.exports = {
    getFixtureLineups
};