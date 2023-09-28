const axios = require('axios');
require("dotenv").config();

const { apiUrl } = require("./constants");
const cache = require('../cache'); // Assuming you have a cache module

const API_ENDPOINT = `${apiUrl}/teams`;
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
        throw error;
    }
};

const getTeams = async (params) => {
    return await fetchData(API_ENDPOINT, params);
};

const getTeamStatistics = async (params) => {
    return await fetchData(`${API_ENDPOINT}/statistics`, params);
};

const getTeamSeasons = async (params) => {
    return await fetchData(`${API_ENDPOINT}/seasons`, params);
};

const getTeamCountries = async (params) => {
    return await fetchData(`${API_ENDPOINT}/countries`, params);
};

module.exports = {
    getTeams,
    getTeamStatistics,
    getTeamSeasons,
    getTeamCountries
};