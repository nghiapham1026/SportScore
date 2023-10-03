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
        // Check for existing data using team.id as a unique identifier
        const existingData = await GroupedFixtureLineups.findOne({
            "allFixtureLineups.team.id": { $in: fixtureLineupsData.map(f => f.team.id) }
        });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const fixtureLineupsGroup = new GroupedFixtureLineups(groupedData);
            await fixtureLineupsGroup.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await GroupedFixtureLineups.findOneAndReplace({
                "allFixtureLineups.team.id": { $in: fixtureLineupsData.map(f => f.team.id) }
            }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error interacting with MongoDB:", error);
    }

    return fixtureLineupsData;
};

module.exports = {
    getFixtureLineups
};