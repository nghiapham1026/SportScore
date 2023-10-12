const fixturesModel = require('../services/fixtures/fixtures');
const headToHeadModel = require('../services/fixtures/headtohead');
const statisticsModel = require('../services/fixtures/statistics');
const eventsModel = require('../services/fixtures/events');
const lineupsModel = require('../services/fixtures/lineups');
const playersModel = require('../services/fixtures/players');

const GroupedFixture = require('../models/fixtures/fixtures');
const HeadToHeadModel = require('../models/fixtures/headtohead');
const StatisticsModel = require('../models/fixtures/statistics');
const EventsModel = require('../models/fixtures/events');
const LineupsModel = require('../models/fixtures/lineups');
const PlayersModel = require('../models/fixtures/players');

const genericHandler = require('../utils/genericHandler');
const retrieveDataFromDb = require('../utils/retrieveData');

const endpoints = {
  rounds: fixturesModel.getRounds,
  fixtures: fixturesModel.getFixtures,
  headtohead: headToHeadModel.getHeadToHeadFixtures,
  statistics: statisticsModel.getFixtureStatistics,
  events: eventsModel.getFixtureEvents,
  lineups: lineupsModel.getFixtureLineups,
  players: playersModel.getFixturePlayers,
};

// http://localhost:3000/fixtures/getFixtureRounds?league=39&season=2022
const getRounds = (req, res) =>
  genericHandler(endpoints.rounds, req, res, 'Failed to fetch rounds');

// http://localhost:3000/fixtures/getFixtures?date=2023-10-05
const getFixtures = (req, res) =>
  genericHandler(endpoints.fixtures, req, res, 'Failed to fetch fixtures');

// http://localhost:3000/fixtures/getFixtureHeadToHead?id=33-39 (faulty)
const getTeamHeadToHead = (req, res) =>
  genericHandler(
    endpoints.headtohead,
    req,
    res,
    'Failed to fetch head to head'
  );

// http://localhost:3000/fixtures/getMatchStatistics?fixture=394
const getTeamStatistics = (req, res) =>
  genericHandler(endpoints.statistics, req, res, 'Failed to fetch statistics');

// http://localhost:3000/fixtures/getMatchEvents?fixture=394
const getTeamEvents = (req, res) =>
  genericHandler(endpoints.events, req, res, 'Failed to fetch events');

// http://localhost:3000/fixtures/getMatchLineups?fixture=394
const getTeamLineups = (req, res) =>
  genericHandler(endpoints.lineups, req, res, 'Failed to fetch lineups');

// http://localhost:3000/fixtures/getMatchPlayerStatistics?fixture=394
const getTeamPlayersStatistics = (req, res) =>
  genericHandler(
    endpoints.players,
    req,
    res,
    'Failed to fetch player statistics'
  );

// http://localhost:3000/fixtures/db/getHeadToHead?id=33-39 (faulty)
const getHeadToHeadFromDb = (req, res) =>
  retrieveDataFromDb(
    HeadToHeadModel,
    req.query,
    res,
    'No head-to-head data found for the provided parameters'
  );

// http://localhost:3000/fixtures/db/getFixtures?league=39&season=2022
const getFixturesFromDb = (req, res) =>
  retrieveDataFromDb(
    GroupedFixture,
    req.query,
    res,
    'No fixtures found for the provided parameters'
  );

// http://localhost:3000/fixtures/db/getStatistics?fixture=394
const getStatisticsFromDb = (req, res) =>
  retrieveDataFromDb(
    StatisticsModel,
    req.query,
    res,
    'No statistics data found for the provided parameters'
  );

// http://localhost:3000/fixtures/db/getEvents?fixture=394
const getEventsFromDb = (req, res) =>
  retrieveDataFromDb(
    EventsModel,
    req.query,
    res,
    'No events data found for the provided parameters'
  );

// http://localhost:3000/fixtures/db/getLineups?fixture=394
const getLineupsFromDb = (req, res) =>
  retrieveDataFromDb(
    LineupsModel,
    req.query,
    res,
    'No lineups data found for the provided parameters'
  );

// http://localhost:3000/fixtures/db/getPlayers?fixture=394
const getPlayersFromDb = (req, res) =>
  retrieveDataFromDb(
    PlayersModel,
    req.query,
    res,
    'No players data found for the provided parameters'
  );

module.exports = {
  getRounds,
  getFixtures,
  getTeamHeadToHead,
  getTeamStatistics,
  getTeamEvents,
  getTeamLineups,
  getTeamPlayersStatistics,
  getFixturesFromDb,
  getHeadToHeadFromDb,
  getStatisticsFromDb,
  getEventsFromDb,
  getLineupsFromDb,
  getPlayersFromDb,
};
