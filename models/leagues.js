const axios = require('axios');
require("dotenv").config();

const { apiUrl } = require("./constants");
const cache = require('../cache');

const API_ENDPOINT = `${apiUrl}/leagues`;
const API_KEY = process.env.key;

const fetchDataWithCache = async (endpoint, params) => {
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
        throw error;
    }
};

const getLeagues = async (params) => {
    return await fetchDataWithCache(API_ENDPOINT, params);
};

const getSeasons = async (params) => {
    return await fetchDataWithCache(`${API_ENDPOINT}/seasons`, params);
};

module.exports = {
    getLeagues,
    getSeasons
};