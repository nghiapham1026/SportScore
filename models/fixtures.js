const axios = require('axios');
require("dotenv").config();

const { apiUrl } = require("./constants");
const cache = require('../cache'); // Import the caching module

const API_ENDPOINT = `${apiUrl}/fixtures`;
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

const getRounds = async (params) => {
    return await fetchData(`${API_ENDPOINT}/rounds`, params);
};

const getFixtures = async (params) => {
    return await fetchData(API_ENDPOINT, params);
};

const getTeamHeadToHead = async (params) => {
    return await fetchData(`${API_ENDPOINT}/headtohead`, params);
};

const getTeamStatistics = async (params) => {
    return await fetchData(`${API_ENDPOINT}/statistics`, params);
};

const getTeamEvents = async (params) => {
    return await fetchData(`${API_ENDPOINT}/events`, params);
};

const getTeamLineups = async (params) => {
    return await fetchData(`${API_ENDPOINT}/lineups`, params);
};

const getTeamPlayersStatistics = async (params) => {
    return await fetchData(`${API_ENDPOINT}/players`, params);
};

module.exports = {
    getRounds,
    getFixtures,
    getTeamHeadToHead,
    getTeamStatistics,
    getTeamEvents,
    getTeamLineups,
    getTeamPlayersStatistics
};