const axios = require('axios');
require("dotenv").config();

const API_ENDPOINT = 'https://v3.football.api-sports.io/teams';
const API_KEY = process.env.key;  // Assuming you're using dotenv for environment variables

const getTeams = async (params) => {
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

const getTeamSeasons = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/seasons`, {
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

const getTeamCountries = async (params) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/countries`, {
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
    getTeams,
    getTeamStatistics,
    getTeamSeasons,
    getTeamCountries
};