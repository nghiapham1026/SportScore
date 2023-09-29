require("dotenv").config();

const { apiUrl } = require("./constants");
const fetchData = require('../utils/fetchData'); // Import the fetchData function

const API_ENDPOINT = `${apiUrl}/fixtures`;

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