const axios = require('axios');
require('dotenv').config();

const serverUrl = process.env.serverUrl;

// Function to fetch fixtures for today's date
const fetchFixturesForToday = async () => {
  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  try {
    // Make a request to the /fixtures/getFixtures endpoint with the date parameter
    const response = await axios.get(`${serverUrl}/fixtures/getFixtures`, {
      params: {
        date: today,
      },
    });

    console.log('Data fetched successfully:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Execute the function
fetchFixturesForToday();
