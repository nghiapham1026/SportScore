require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
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
        // Check for existing data using team.id as a unique identifier
        const existingData = await GroupedTeam.findOne({
            "allTeams.team.id": { $in: groupedData.allTeams.map(t => t.team.id) }
        });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const teamGroup = new GroupedTeam(groupedData);
            await teamGroup.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await GroupedTeam.findOneAndReplace({
                "allTeams.team.id": { $in: groupedData.allTeams.map(t => t.team.id) }
            }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return groupedData; // Return the grouped data
};

module.exports = {
    getTeams
};