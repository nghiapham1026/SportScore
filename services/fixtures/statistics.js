require("dotenv").config();

const { apiUrl } = require("../../utils/constants");
const fetchData = require('../../utils/fetchData');
const GroupedFixtureStatistics = require('../../models/fixtures/statistics'); // Import the schema

const API_ENDPOINT = `${apiUrl}/fixtures/statistics`;

const getFixtureStatistics = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const fixtureStatisticsData = data.response.map(item => ({
        team: item.team,
        statistics: item.statistics
    }));

    // Create a single object to group all the fixture statistics and include the query params
    const groupedData = {
        queryParams: params,
        allFixtureStatistics: fixtureStatisticsData
    };

    // Save to MongoDB
    try {
        const existingData = await GroupedFixtureStatistics.findOne({ "queryParams": params });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const fixtureStatisticsGroup = new GroupedFixtureStatistics(groupedData);
            await fixtureStatisticsGroup.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await GroupedFixtureStatistics.findOneAndReplace({ "queryParams": params }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return fixtureStatisticsData;
};

module.exports = {
    getFixtureStatistics
};