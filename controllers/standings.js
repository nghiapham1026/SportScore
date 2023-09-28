const standingsModel = require('../models/standings');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
    standings: standingsModel.getStandings
};

const getStandings = (req, res) => genericHandler(endpoints.standings, req, res, 'Failed to fetch standings');

module.exports = {
    getStandings
};