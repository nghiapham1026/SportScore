require("dotenv").config();

const { apiUrl } = require("../constants");
const fetchData = require('../../utils/fetchData');
const GroupedFixture = require('../../models/fixtures/fixtures'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures`;

const getFixtures = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const fixtureData = data.response.map(item => ({
        fixture: item.fixture,
        league: item.league,
        teams: item.teams,
        goals: item.goals,
        score: item.score
    }));

    // Create a single object to group all the fixtures
    const groupedData = {
        allFixtures: fixtureData
    };

    // Save to MongoDB
    try {
        const fixtureGroup = new GroupedFixture(groupedData);
        await fixtureGroup.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return fixtureData;
};

const getRounds = async (params) => {
    return await fetchData(`${API_ENDPOINT}/rounds`, params);
};

const getTeamEvents = async (params) => {
    return await fetchData(`${API_ENDPOINT}/events`, params);
};

const getTeamLineups = async (params) => {
    return await fetchData(`${API_ENDPOINT}/lineups`, params);
};

const getTeamPlayersStatistics = async (params) => {
    return await fetchData(`${API_ENDPOINT}/players`, params);
};

module.exports = {
    getRounds,
    getFixtures,
    getTeamEvents,
    getTeamLineups,
    getTeamPlayersStatistics
};