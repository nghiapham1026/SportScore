const predictionsModel = require('../services/predictions');
const GroupedPredictions = require('../models/predictions');

const genericHandler = require('../utils/genericHandler');
const { retrieveDataFromDb } = require('../utils/retrieveData');

const endpoint = {
  predictions: predictionsModel.getPredictions,
};

// Define the endpoint function for getting predictions
const getPredictions = (req, res) =>
  genericHandler(endpoint.predictions, req, res, 'Failed to fetch predictions');

// Define the function for getting predictions from the database
const getPredictionsFromDb = (req, res) =>
  retrieveDataFromDb(
    GroupedPredictions,
    predictionsModel.getPredictions,
    req.query,
    res,
    'No predictions data found for the provided parameters'
  );

module.exports = {
  getPredictions,
  getPredictionsFromDb,
};
