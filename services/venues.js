require("dotenv").config();

const { apiUrl } = require("../utils/constants");
const fetchData = require('../utils/fetchData');
const Venue = require('../models/venues'); // Import the schema

const API_ENDPOINT = `${apiUrl}/venues`;

const getVenues = async (params) => {
    const data = await fetchData(API_ENDPOINT, params);
    
    // Process the data into the schema
    const venueData = data.response.map(item => ({
        venueId: item.id,
        name: item.name,
        address: item.address,
        city: item.city,
        country: item.country,
        capacity: item.capacity,
        surface: item.surface,
        image: item.image
    }));

    const groupedData = {
        allVenues: venueData
    };

    // Save to MongoDB
    try {
        // Check for existing data using venue id as a unique identifier
        const existingData = await Venue.findOne({
            "allVenues.venueId": { $in: groupedData.allVenues.map(l => l.venueId) }
        });
        
        // If data does not exist, save to MongoDB
        if (!existingData) {
            const venues = new Venue(groupedData);
            await venues.save();
            console.log("Data saved successfully");
        } else {
            // Replace the existing data
            await Venue.findOneAndReplace({
                "allVenues.venueId": { $in: groupedData.allVenues.map(l => l.venueId) }
            }, groupedData);
            console.log("Data already exists in the database. Existing data has been replaced with new data.");
        }
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
    }

    return venueData;
};

module.exports = {
    getVenues
};