require("dotenv").config();

const { apiUrl } = require("../constants");
const fetchData = require('../../utils/fetchData');
const FixturePlayers = require('../../models//fixtures/players'); // Import the new schema

const API_ENDPOINT = `${apiUrl}/fixtures/players`;

const getFixturePlayers = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const fixturePlayersData = data.response.map(item => ({
        team: item.team,
        players: item.players.map(playerItem => ({
            player: playerItem.player,
            statistics: playerItem.statistics
        }))
    }));

    // Save to MongoDB
    try {
        const fixturePlayersEntry = new FixturePlayers(fixturePlayersData);
        await fixturePlayersEntry.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return fixturePlayersData;
};

module.exports = {
    getFixturePlayers
};