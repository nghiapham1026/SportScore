require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const FixturePlayers = require('../../models/fixtures/players'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/players`;

const getFixturePlayers = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Grouping the two datasets into a single object
    const groupedData = {
        teams: data.response.map(item => {
            return {
                team: item.team,
                players: item.players.map(playerItem => ({
                    player: playerItem.player,
                    statistics: playerItem.statistics
                }))
            };
        })
    };

    // Save to MongoDB
    try {
        // Check for existing data using team.id as a unique identifier
        const existingData = await FixturePlayers.findOne({
            "teams.team.id": { $in: groupedData.teams.map(t => t.team.id) }
        });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const fixturePlayersEntry = new FixturePlayers(groupedData);
            await fixturePlayersEntry.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await FixturePlayers.findOneAndReplace({
                "teams.team.id": { $in: groupedData.teams.map(t => t.team.id) }
            }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error interacting with MongoDB:", error);
    }

    return groupedData;
};

module.exports = {
    getFixturePlayers
};