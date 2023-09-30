const axios = require('axios');
const cache = require('./cache'); // Import the caching module

const API_KEY = process.env.key;

const fetchData = async (endpoint, params) => {
    const cacheKey = `${endpoint}-${JSON.stringify(params)}`;

    // Try to fetch data from cache
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return { ...cachedData, fromCache: true };
    }

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });

        // Store the API response in cache
        cache.set(cacheKey, response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching data from API:", error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = fetchData;