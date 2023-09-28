const teamsModel = require('../models/teams');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
    teams: teamsModel.getTeams,
    teamStatistics: teamsModel.getTeamStatistics,
    teamSeasons: teamsModel.getTeamSeasons,
    teamCountries: teamsModel.getTeamCountries
};

const getTeams = (req, res) => genericHandler(endpoints.teams, req, res, 'Failed to fetch teams');
const getTeamStatistics = (req, res) => genericHandler(endpoints.teamStatistics, req, res, 'Failed to fetch team statistics');
const getTeamSeasons = (req, res) => genericHandler(endpoints.teamSeasons, req, res, 'Failed to fetch team seasons');
const getTeamCountries = (req, res) => genericHandler(endpoints.teamCountries, req, res, 'Failed to fetch team countries');

module.exports = {
    getTeams,
    getTeamStatistics,
    getTeamSeasons,
    getTeamCountries
};