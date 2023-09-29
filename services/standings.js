require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData');

const API_ENDPOINT = `${apiUrl}/standings`;

const getStandings = async (params) => {
    return await fetchData(API_ENDPOINT, params);
};

module.exports = {
    getStandings
};