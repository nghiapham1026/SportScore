const leaguesModel = require('../services/leagues');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
    leagues: leaguesModel.getLeagues,
};

const getLeagues = (req, res) => genericHandler(endpoints.leagues, req, res, 'Failed to fetch leagues');

module.exports = {
    getLeagues,
};