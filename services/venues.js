require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData');
const Venue = require('../models/venues'); // Import the schema

const API_ENDPOINT = `${apiUrl}/venues`;

const getVenues = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const venueData = data.response.map(item => ({
        id: item.id,
        name: item.name,
        address: item.address,
        city: item.city,
        country: item.country,
        capacity: item.capacity,
        surface: item.surface,
        image: item.image
    }));

    // Create a single object to group all the venues
    const groupedData = {
        allVenues: venueData
    };

    // Save to MongoDB
    try {
        const venueGroup = new Venue(groupedData);
        await venueGroup.save();
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return venueData;
};

module.exports = {
    getVenues
};