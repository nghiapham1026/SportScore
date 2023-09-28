require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData');

const API_ENDPOINT = `${apiUrl}/venues`;

const getVenues = async (params) => {
    return await fetchData(API_ENDPOINT, params);
};

module.exports = {
    getVenues
};