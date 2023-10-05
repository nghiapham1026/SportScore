require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const FixturePlayers = require('../../models/fixtures/players'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures/players`;

const getFixturePlayers = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Grouping the two datasets into a single object
    const groupedData = {
        queryParams: params,
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
        const existingData = await FixturePlayers.findOne({ "queryParams": params });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const fixturePlayersEntry = new FixturePlayers(groupedData);
            await fixturePlayersEntry.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await FixturePlayers.findOneAndReplace({ "queryParams": params }, groupedData);
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