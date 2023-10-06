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

const endpoints = {
  rounds: fixturesModel.getRounds,
  fixtures: fixturesModel.getFixtures,
  headtohead: headToHeadModel.getHeadToHeadFixtures,
  statistics: statisticsModel.getFixtureStatistics,
  events: eventsModel.getFixtureEvents,
  lineups: lineupsModel.getFixtureLineups,
  players: playersModel.getFixturePlayers,
};

const getRounds = (req, res) =>
  genericHandler(endpoints.rounds, req, res, 'Failed to fetch rounds');
const getFixtures = (req, res) =>
  genericHandler(endpoints.fixtures, req, res, 'Failed to fetch fixtures');
const getTeamHeadToHead = (req, res) =>
  genericHandler(
    endpoints.headtohead,
    req,
    res,
    'Failed to fetch head to head'
  );
const getTeamStatistics = (req, res) =>
  genericHandler(endpoints.statistics, req, res, 'Failed to fetch statistics');
const getTeamEvents = (req, res) =>
  genericHandler(endpoints.events, req, res, 'Failed to fetch events');
const getTeamLineups = (req, res) =>
  genericHandler(endpoints.lineups, req, res, 'Failed to fetch lineups');
const getTeamPlayersStatistics = (req, res) =>
  genericHandler(
    endpoints.players,
    req,
    res,
    'Failed to fetch player statistics'
  );

//http://localhost:3000/fixtures/db/getHeadToHead?h2h=33-39
const getHeadToHeadFromDb = async (req, res) => {
  try {
    const queryParams = req.query; // Extract query parameters from the request
    const headToHeadData = await HeadToHeadModel.findOne({ queryParams });

    if (!headToHeadData) {
      return res
        .status(404)
        .json({
          message: 'No head-to-head data found for the provided parameters',
        });
    }

    res.status(200).json(headToHeadData);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//http://localhost:3000/fixtures/db/getFixtures?date=2023-10-05
const getFixturesFromDb = async (req, res) => {
  try {
    const queryParams = req.query; // Extract query parameters from the request
    const fixtures = await GroupedFixture.findOne({ queryParams });

    if (!fixtures) {
      return res
        .status(404)
        .json({ message: 'No fixtures found for the provided parameters' });
    }

    res.status(200).json(fixtures);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//http://localhost:3000/fixtures/db/getStatistics?id=394
const getStatisticsFromDb = async (req, res) => {
  try {
    const queryParams = req.query;
    const statisticsData = await StatisticsModel.findOne({ queryParams });

    if (!statisticsData) {
      return res
        .status(404)
        .json({
          message: 'No statistics data found for the provided parameters',
        });
    }

    res.status(200).json(statisticsData);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//http://localhost:3000/fixtures/db/getEvents?id=394
const getEventsFromDb = async (req, res) => {
  try {
    const queryParams = req.query;
    const eventsData = await EventsModel.findOne({ queryParams });

    if (!eventsData) {
      return res
        .status(404)
        .json({ message: 'No events data found for the provided parameters' });
    }

    res.status(200).json(eventsData);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//http://localhost:3000/fixtures/db/getLineups?id=394
const getLineupsFromDb = async (req, res) => {
  try {
    const queryParams = req.query;
    const lineupsData = await LineupsModel.findOne({ queryParams });

    if (!lineupsData) {
      return res
        .status(404)
        .json({ message: 'No lineups data found for the provided parameters' });
    }

    res.status(200).json(lineupsData);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//http://localhost:3000/fixtures/db/getPlayers?id=394
const getPlayersFromDb = async (req, res) => {
  try {
    const queryParams = req.query;
    const playersData = await PlayersModel.findOne({ queryParams });

    if (!playersData) {
      return res
        .status(404)
        .json({ message: 'No players data found for the provided parameters' });
    }

    res.status(200).json(playersData);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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
