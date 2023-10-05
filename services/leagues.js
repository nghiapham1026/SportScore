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

    // Filter the data for specific league IDs
    const filteredLeagueData = leagueData.filter(item => 
        [39, 107, 135, 78, 61, 2, 3, 848, 143, 45, 48, 528, 556, 81, 529, 531, 547, 137, 66].includes(item.league.id)
    );

    // Create a single object to group all the leagues and include the query params
    const groupedData = {
        queryParams: params,
        allLeagues: filteredLeagueData
    };

    // Save to MongoDB
    try {
        // Check for existing data using queryParams as a unique identifier
        const existingData = await League.findOne({ "queryParams": params });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const leagueGroup = new League(groupedData);
            await leagueGroup.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await League.findOneAndReplace({ "queryParams": params }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return filteredLeagueData;
};

module.exports = {
    getLeagues
};