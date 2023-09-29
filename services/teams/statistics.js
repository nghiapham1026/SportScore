require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData');
const GroupedTeamStatistics = require('../../models/teams/statistics'); // Import the modified schema

const API_ENDPOINT = `${apiUrl}/teams/statistics`;

const getTeamStatistics = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const teamStatisticsData = data.response.map(item => ({
        league: item.league,
        team: item.team,
        form: item.form,
        fixtures: item.fixtures,
        goals: item.goals,
        biggest: item.biggest,
        clean_sheet: item.clean_sheet,
        failed_to_score: item.failed_to_score,
        penalty: item.penalty,
        lineups: item.lineups,
        cards: item.cards
    }));

    // Create a single object to group all the team statistics
    const groupedData = {
        allTeamStatistics: teamStatisticsData
    };
    console.log(groupedData);

    // Save to MongoDB
    try {
        const teamStatisticsGroup = new GroupedTeamStatistics(groupedData);
        await teamStatisticsGroup.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return groupedData; // Return the grouped data
};

module.exports = {
    getTeamStatistics
};