const teamsModel = require('../models/teams');

const getTeams = async (req, res) => {
    try {
        const data = await teamsModel.getTeams(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};

const getTeamStatistics = async (req, res) => {
    try {
        const data = await teamsModel.getTeamStatistics(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team statistics' });
    }
};

const getTeamSeasons = async (req, res) => {
    try {
        const data = await teamsModel.getTeamSeasons(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team seasons' });
    }
};

const getTeamCountries = async (req, res) => {
    try {
        const data = await teamsModel.getTeamCountries(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team countries' });
    }
};

module.exports = {
    getTeams,
    getTeamStatistics,
    getTeamSeasons,
    getTeamCountries
};