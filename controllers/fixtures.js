const fixturesModel = require('../models/fixtures');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
    rounds: fixturesModel.getRounds,
    fixtures: fixturesModel.getFixtures,
    headtohead: fixturesModel.getTeamHeadToHead,
    statistics: fixturesModel.getTeamStatistics,
    events: fixturesModel.getTeamEvents,
    lineups: fixturesModel.getTeamLineups,
    players: fixturesModel.getTeamPlayersStatistics
};

const getRounds = (req, res) => genericHandler(endpoints.rounds, req, res, 'Failed to fetch rounds');
const getFixtures = (req, res) => genericHandler(endpoints.fixtures, req, res, 'Failed to fetch fixtures');
const getTeamHeadToHead = (req, res) => genericHandler(endpoints.headtohead, req, res, 'Failed to fetch head to head');
const getTeamStatistics = (req, res) => genericHandler(endpoints.statistics, req, res, 'Failed to fetch statistics');
const getTeamEvents = (req, res) => genericHandler(endpoints.events, req, res, 'Failed to fetch events');
const getTeamLineups = (req, res) => genericHandler(endpoints.lineups, req, res, 'Failed to fetch lineups');
const getTeamPlayersStatistics = (req, res) => genericHandler(endpoints.players, req, res, 'Failed to fetch player statistics');

module.exports = {
    getRounds,
    getFixtures,
    getTeamHeadToHead,
    getTeamStatistics,
    getTeamEvents,
    getTeamLineups,
    getTeamPlayersStatistics
};