const leaguesModel = require('../models/leagues');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
    leagues: leaguesModel.getLeagues,
    seasons: leaguesModel.getSeasons
};

const getLeagues = (req, res) => genericHandler(endpoints.leagues, req, res, 'Failed to fetch leagues');
const getSeasons = (req, res) => genericHandler(endpoints.seasons, req, res, 'Failed to fetch seasons');

module.exports = {
    getLeagues,
    getSeasons
};