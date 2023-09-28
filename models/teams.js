require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData');

const API_ENDPOINT = `${apiUrl}/teams`;

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