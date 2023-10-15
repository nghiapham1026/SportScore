require('dotenv').config();

const { apiUrl } = require('../../utils/constants');
const fetchData = require('../../utils/fetchData');
const GroupedTeam = require('../../models/teams/teams'); // Import the modified schema

const API_ENDPOINT = `${apiUrl}/teams`;

const getTeams = async (params) => {
  const data = await fetchData(API_ENDPOINT, params);

  // Process the data into the schema
  const teamData = data.response.map((item) => ({
    team: item.team,
    venue: item.venue,
  }));

  // Create a single object to group all the teams and include the query params
  const groupedData = {
    queryParams: params,
    allTeams: teamData,
    updatedAt: Date.now(),  // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    // Check for existing data using queryParams as a unique identifier
    const existingData = await GroupedTeam.findOne({ queryParams: params });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      const teamGroup = new GroupedTeam(groupedData);
      await teamGroup.save();
      console.log('Data saved successfully');
    } else {
      // Replace the existing data
      await GroupedTeam.findOneAndReplace(
        { queryParams: params },
        {...groupedData, updatedAt: Date.now()}  // Update the timestamp
      );
      console.log(
        'Data already exists in the database. Existing data has been replaced with new data.'
      );
    }
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  }

  return groupedData; // Return the grouped data
};

module.exports = {
  getTeams,
};
