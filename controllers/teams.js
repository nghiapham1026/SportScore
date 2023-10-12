const teamsModel = require('../services/teams/teams');
const teamsStats = require('../services/teams/statistics');

const Team = require('../models/teams/teams'); // Import the schema
const TeamStatistics = require('../models/teams/statistics'); // Import the schema

const retrieveDataFromDb = require('../utils/retrieveData');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  teams: teamsModel.getTeams,
  teamStatistics: teamsStats.getTeamStatistics,
};

// http://localhost:3000/teams/getTeams?league=39&season=2021&id=33
const getTeams = (req, res) =>
  genericHandler(endpoints.teams, req, res, 'Failed to fetch teams');

// http://localhost:3000/teams/getTeamSeasonStatistics?league=39&season=2021&id=33 (faulty)
const getTeamStatistics = (req, res) =>
  genericHandler(
    endpoints.teamStatistics,
    req,
    res,
    'Failed to fetch team statistics'
  );

// http://localhost:3000/teams/db/getTeams?league=39&season=2021&id=33
const getTeamsFromDb = (req, res) => {
  const queryParams = req.query; // Extract query parameters from the request
  retrieveDataFromDb(
    Team,
    queryParams,
    res,
    'No teams found for the provided parameters'
  );
};

// http://localhost:3000/teams/db/getStatistics?league=39&season=2021&id=33 (faulty)
const getTeamStatisticsFromDb = (req, res) => {
  const queryParams = req.query; // Extract query parameters from the request
  retrieveDataFromDb(
    TeamStatistics,
    queryParams,
    res,
    'No team statistics found for the provided parameters'
  );
};

module.exports = {
  getTeams,
  getTeamStatistics,
  getTeamsFromDb,
  getTeamStatisticsFromDb,
};
