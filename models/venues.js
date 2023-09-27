const axios = require('axios');
require("dotenv").config();

const { apiUrl } = require("./constants");

const API_ENDPOINT = `${apiUrl}/venues`;
const API_KEY = process.env.key;  // Assuming you're using dotenv for environment variables

const getVenues = async (params) => {
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

module.exports = {
    getVenues
};