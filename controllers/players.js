const playersModel = require('../services/players/players');
const squadsModel = require('../services/players/squads');
const scorersModel = require('../services/players/scorers');
const assistsModel = require('../services/players/assists'); // Update path if needed

const Assist = require('../models/players/assists');
const Scorer = require('../models/players/scorers');
const Squad = require('../models/players/squads');
const Player = require('../models/players/players');

const retrieveDataFromDb = require('../utils/retrieveData');
const genericHandler = require('../utils/genericHandler');

const endpoints = {
  players: playersModel.getPlayers,
  squads: squadsModel.getSquads,
  scorers: scorersModel.getTopScorers,
  assists: assistsModel.getAssists,
};

// http://localhost:3000/players/getPlayers?team=39&season=2022
const getPlayers = (req, res) =>
  genericHandler(endpoints.players, req, res, 'Failed to fetch players');

// http://localhost:3000/players/getSquads?team=39
const getSquads = (req, res) =>
  genericHandler(endpoints.squads, req, res, 'Failed to fetch squads');

// http://localhost:3000/players/getTopScorers?league=39&season=2022
const getTopScorers = (req, res) =>
  genericHandler(endpoints.scorers, req, res, 'Failed to fetch top scorers');

// http://localhost:3000/players/getTopAssists?league=39&season=2022
const getTopAssists = (req, res) =>
  genericHandler(endpoints.assists, req, res, 'Failed to fetch assists');

// http://localhost:3000/players/getSquads?team=39
const getPlayersFromDb = (req, res) => {
  const queryParams = req.query;
  retrieveDataFromDb(
    Player,
    queryParams,
    res,
    'No players found for the provided parameters'
  );
};

// http://localhost:3000/players/db/getSquads?team=39
const getSquadsFromDb = (req, res) => {
  const queryParams = req.query;
  retrieveDataFromDb(
    Squad,
    queryParams,
    res,
    'No squads found for the provided parameters'
  );
};

// http://localhost:3000/players/db/getTopScorers?league=39&season=2022
const getTopScorersFromDb = (req, res) => {
  const queryParams = req.query;
  retrieveDataFromDb(
    Scorer,
    queryParams,
    res,
    'No top scorers found for the provided parameters'
  );
};

// http://localhost:3000/players/db/getTopAssists?league=39&season=2022
const getTopAssistsFromDb = (req, res) => {
  const queryParams = req.query;
  retrieveDataFromDb(
    Assist,
    queryParams,
    res,
    'No assists found for the provided parameters'
  );
};

module.exports = {
  getPlayers,
  getSquads,
  getTopScorers,
  getTopAssists,
  getPlayersFromDb,
  getSquadsFromDb,
  getTopScorersFromDb,
  getTopAssistsFromDb,
};
