const teamsModel = require('../services/teams/teams');
const teamsStats = require('../services/teams/statistics');
const teamSeasons = require('../services/teams/seasons');

const Team = require('../models/teams/teams'); // Import the schema
const TeamStatistics = require('../models/teams/statistics'); // Import the schema
const Seasons = require('../models/teams/seasons');

const retrieveDataFromDb = require('../utils/retrieveData');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  teams: teamsModel.getTeams,
  teamStatistics: teamsStats.getTeamStatistics,
  teamSeasons: teamSeasons.getTeamSeasons,
};

// http://localhost:3000/teams/getTeams?league=39&season=2021&id=33
const getTeams = (req, res) =>
  genericHandler(endpoints.teams, req, res, 'Failed to fetch teams');

// http://localhost:3000/teams/getTeamSeasonStatistics?league=39&season=2021&team=33
const getTeamStatistics = (req, res) =>
  genericHandler(
    endpoints.teamStatistics,
    req,
    res,
    'Failed to fetch team statistics'
  );

// http://localhost:3000/teams/getTeamSeasons?team=39
const getTeamSeasons = (req, res) =>
  genericHandler(endpoints.teamSeasons, req, res, 'Failed to fetch seasons');

// http://localhost:3000/teams/db/getTeams?league=39&season=2021&id=33
const getTeamsFromDb = (req, res) => {
  retrieveDataFromDb(
    Team,
    teamsModel.getTeams,
    req.query,
    res,
    'No teams found for the provided parameters'
  );
};

// http://localhost:3000/teams/db/getStatistics?league=39&season=2021&team=39
const getTeamStatisticsFromDb = (req, res) => {
  retrieveDataFromDb(
    TeamStatistics,
    teamsStats.getTeamStatistics,
    req.query,
    res,
    'No team statistics found for the provided parameters'
  );
};

const getTeamSeasonsFromDb = (req, res) => {
    retrieveDataFromDb(
      Seasons,
      teamSeasons.getTeamSeasons,
      req.query,
      res,
      'No team seasons found for the provided parameters'
    );
  };

module.exports = {
  getTeams,
  getTeamStatistics,
  getTeamSeasons,
  getTeamsFromDb,
  getTeamStatisticsFromDb,
  getTeamSeasonsFromDb,
};
