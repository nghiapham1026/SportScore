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
        const fixturePlayersEntry = new FixturePlayers(groupedData);
        await fixturePlayersEntry.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return groupedData;
};

module.exports = {
    getFixturePlayers
};