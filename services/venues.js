require('dotenv').config();

const { apiUrl } = require('../utils/constants');
const fetchData = require('../utils/fetchData');
const Venue = require('../models/venues'); // Import the modified schema

const API_ENDPOINT = `${apiUrl}/venues`;

const convertValuesToLowercase = (obj) => {
  const newObj = {};
  for (const key in obj) {
    newObj[key] =
      typeof obj[key] === 'string' ? obj[key].toLowerCase() : obj[key];
  }
  return newObj;
};

const getVenues = async (params, attempts = 0) => {
  const lowercasedParams = convertValuesToLowercase(params);
  const data = await fetchData(API_ENDPOINT, lowercasedParams);

  if (!data.response || data.response.length === 0) {
    if (attempts < 2) {
      // 2 here because the first call is attempt 0
      return getVenues(params, attempts + 1);
    } else {
      return { error: 'Empty data after multiple attempts' };
    }
  }

  // Process the data into the schema
  const venueData = data.response.map((item) => ({
    venueId: item.id,
    name: item.name,
    address: item.address,
    city: item.city,
    country: item.country,
    capacity: item.capacity,
    surface: item.surface,
    image: item.image,
  }));

  // Create a single object to group all the venues and include the query params
  const groupedData = {
    queryParams: lowercasedParams,
    allVenues: venueData,
    updatedAt: Date.now(), // Set the updatedAt timestamp
  };

  // Save to MongoDB
  try {
    // Check for existing data using queryParams as a unique identifier
    const existingData = await Venue.findOne({ queryParams: lowercasedParams });

    // If data does not exist, save to MongoDB
    if (!existingData) {
      await Venue.create(groupedData);
      console.log('Data saved successfully');
    } else if (
      existingData.updatedAt < new Date(new Date() - 24 * 60 * 60 * 1000)
    ) {
      // Replace the existing data
      await Venue.findOneAndReplace(
        { queryParams: lowercasedParams },
        { ...groupedData, updatedAt: Date.now() } // Update the timestamp
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
  getVenues,
};
