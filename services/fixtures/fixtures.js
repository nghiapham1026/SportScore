require("dotenv").config();

const { apiUrl } = require("../constants");
const fetchData = require('../../utils/fetchData');
const GroupedFixture = require('../../models/fixtures/fixtures'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures`;

const getFixtures = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Filter data based on the league IDs
    const filteredData = data.response.filter(item => [39, 107, 135, 78, 61, 2, 3, 848, 143, 45, 48, 528, 556, 81, 529, 531, 547, 137, 66].includes(item.league.id));
    
    // Process the filtered data into the schema
    const fixtureData = filteredData.map(item => ({
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

module.exports = {
    getRounds,
    getFixtures
};