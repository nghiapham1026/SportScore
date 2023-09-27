const teamsModel = require('../models/teams');

//Sample Query: http://localhost:3000/teams?league=39&season=2022
const getTeams = async (req, res) => {
    try {
        const data = await teamsModel.getTeams(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};


//Sample Query: http://localhost:3000/teams/statistics?season=2022&team=33&league=39
const getTeamStatistics = async (req, res) => {
    try {
        const data = await teamsModel.getTeamStatistics(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team statistics' });
    }
};


//Sample Query: http://localhost:3000/teams/seasons?team=33
const getTeamSeasons = async (req, res) => {
    try {
        const data = await teamsModel.getTeamSeasons(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team seasons' });
    }
};

//Sample Query: http://localhost:3000/teams/countries
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