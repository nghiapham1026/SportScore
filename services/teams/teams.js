require("dotenv").config();

const { apiUrl } = require("../constants");
const fetchData = require('../../utils/fetchData');
const GroupedTeam = require('../../models/teams/teams'); // Import the modified schema

const API_ENDPOINT = `${apiUrl}/teams`;

const getTeams = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const teamData = data.response.map(item => ({
        team: item.team,
        venue: item.venue
    }));

    // Create a single object to group all the teams
    const groupedData = {
        allTeams: teamData
    };

    // Save to MongoDB
    try {
        const teamGroup = new GroupedTeam(groupedData);
        await teamGroup.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return groupedData; // Return the grouped data
};

module.exports = {
    getTeams
};