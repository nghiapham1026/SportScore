const teamsModel = require('../services/teams/teams');
const teamsStats = require('../services/teams/statistics');
const Team = require('../models/teams/teams'); // Import the schema
const TeamStatistics = require('../models/teams/statistics'); // Import the schema
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  teams: teamsModel.getTeams,
  teamStatistics: teamsStats.getTeamStatistics,
};

const getTeams = (req, res) =>
  genericHandler(endpoints.teams, req, res, 'Failed to fetch teams');

const getTeamStatistics = (req, res) =>
  genericHandler(
    endpoints.teamStatistics,
    req,
    res,
    'Failed to fetch team statistics'
  );

//http://localhost:3000/teams/getTeams?league=39&season=2021&id=33
const getTeamsFromDb = async (req, res) => {
  try {
    const queryParams = req.query; // Extract query parameters from the request
    const teams = await Team.findOne({ queryParams });
    
    if (!teams) {
      return res.status(404).json({ message: 'No teams found for the provided parameters' });
    }

    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//http://localhost:3000/teams/db/getStatistics?league=39&season=2021&id=33
const getTeamStatisticsFromDb = async (req, res) => {
  try {
    const queryParams = req.query; // Extract query parameters from the request
    const teamStatistics = await TeamStatistics.findOne({ queryParams });
    
    if (!teamStatistics) {
      return res.status(404).json({ message: 'No team statistics found for the provided parameters' });
    }

    res.status(200).json(teamStatistics);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getTeams,
  getTeamStatistics,
  getTeamsFromDb,
  getTeamStatisticsFromDb,
};