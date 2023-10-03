const mongoose = require('mongoose');
require("dotenv").config();

const { apiUrl } = require("../utils/constants");
const fetchData = require('../utils/fetchData');
const League = require('../models/leagues'); // Import the schema

const API_ENDPOINT = `${apiUrl}/leagues`;

const getLeagues = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const leagueData = data.response.map(item => ({
        league: item.league,
        country: item.country,
        seasons: item.seasons
    }));

    // Create a single object to group all the leagues
    const groupedData = {
        allLeagues: leagueData
    };

    // Save to MongoDB
    try {
        // Check for existing data using league.id as a unique identifier
        const existingData = await League.findOne({
            "allLeagues.league.id": { $in: groupedData.allLeagues.map(l => l.league.id) }
        });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const leagueGroup = new League(groupedData);
            await leagueGroup.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await League.findOneAndReplace({
                "allLeagues.league.id": { $in: groupedData.allLeagues.map(l => l.league.id) }
            }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return leagueData;
};

module.exports = {
    getLeagues,
};