const axios = require('axios');
require("dotenv").config();

const { apiUrl } = require("./constants");

const API_ENDPOINT = `${apiUrl}/fixtures`;
const API_KEY = process.env.key;  // Replace with your API key

const getRounds = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/rounds`, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getFixtures = async (params) => {
    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTeamHeadToHead = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/headtohead`, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTeamStatistics = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/statistics`, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTeamEvents = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/events`, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTeamLineups = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/lineups`, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTeamPlayersStatistics = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/players`, {
            headers: {
                'x-rapidapi-key': API_KEY
            },
            params: params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
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