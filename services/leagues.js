const mongoose = require('mongoose');
require("dotenv").config();

const { apiUrl } = require("./constants");
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

    // Save to MongoDB
    try {
        await League.insertMany(leagueData);
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return leagueData;
};

module.exports = {
    getLeagues,
};