require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData');

const API_ENDPOINT = `${apiUrl}/leagues`;

const getLeagues = async (params) => {
    return await fetchData(API_ENDPOINT, params);
};

const getSeasons = async (params) => {
    return await fetchData(`${API_ENDPOINT}/seasons`, params);
};

module.exports = {
    getLeagues,
    getSeasons
};