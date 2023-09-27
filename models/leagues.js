const axios = require('axios');
require("dotenv").config();

const { apiUrl } = require("./constants");

const API_ENDPOINT = `${apiUrl}/leagues`;
const API_KEY = process.env.key;  // Replace with your API key

const getLeagues = async (params) => {
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

const getSeasons = async (params) => {
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

module.exports = {
    getLeagues,
    getSeasons
};