const teamsModel = require('../services/teams/teams');
const teamsStats = require('../services/teams/statistics');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
    teams: teamsModel.getTeams,
    teamStatistics: teamsStats.getTeamStatistics,
};

const getTeams = (req, res) => genericHandler(endpoints.teams, req, res, 'Failed to fetch teams');
const getTeamStatistics = (req, res) => genericHandler(endpoints.teamStatistics, req, res, 'Failed to fetch team statistics');

module.exports = {
    getTeams,
    getTeamStatistics,
};