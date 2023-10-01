require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData');
const LeagueStanding = require('../models/standings'); // Import the schema

const API_ENDPOINT = `${apiUrl}/standings`;

const getStandings = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const standingData = data.response.map(item => ({
        league: {
            id: item.league.id,
            name: item.league.name,
            country: item.league.country,
            logo: item.league.logo,
            flag: item.league.flag,
            season: item.league.season
        },
        standings: item.league.standings
    }));

    // Save to MongoDB
    try {
        await LeagueStanding.insertMany(standingData);
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return standingData;
};

module.exports = {
    getStandings
};