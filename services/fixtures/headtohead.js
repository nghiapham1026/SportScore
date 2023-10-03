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

    // Check if data already exists in MongoDB
    try {
        // Check for existing data using fixture.id as a unique identifier
        const existingData = await groupedHeadToHeadFixtureSchema.findOne({
            "allHeadToHeadFixtures.fixture.id": { $in: headToHeadFixtureData.map(f => f.fixture.id) }
        });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const headToHeadFixtureGroup = new groupedHeadToHeadFixtureSchema(groupedData);
            await headToHeadFixtureGroup.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await groupedHeadToHeadFixtureSchema.findOneAndReplace({
                "allHeadToHeadFixtures.fixture.id": { $in: headToHeadFixtureData.map(f => f.fixture.id) }
            }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error interacting with MongoDB:", error);
    }

    return headToHeadFixtureData;
};

module.exports = {
    getHeadToHeadFixtures
};