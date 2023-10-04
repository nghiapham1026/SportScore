require("dotenv").config();

const { apiUrl } = require("../utils/constants");
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
        // Loop through each standing data
        for (const standing of standingData) {
            // Check for existing data using league.id and league.season as unique identifiers
            const existingData = await LeagueStanding.findOne({
                "league.id": standing.league.id,
                "league.season": standing.league.season
            });
            
            // If data does not exist, save to MongoDB
            if (!existingData) {
                await LeagueStanding.create(standing);
                console.log(`Data saved successfully`);
            } else {
                // Replace the existing data
                await LeagueStanding.findOneAndReplace({
                    "league.id": standing.league.id,
                    "league.season": standing.league.season
                }, standing);
                console.log(`Data already exists. Existing data has been replaced with new data.`);
            }
        }
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return standingData;
};

module.exports = {
    getStandings
};