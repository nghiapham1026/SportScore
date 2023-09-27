const fixturesModel = require('../models/fixtures');

//Sample Query: http://localhost:3000/fixtures/rounds?league=39&season=2023
const getRounds = async (req, res) => {
    try {
        const data = await fixturesModel.getRounds(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rounds' });
    }
};

//Sample Query: http://localhost:3000/fixtures?league=39&season=2022
const getFixtures = async (req, res) => {
    try {
        const data = await fixturesModel.getFixtures(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fixtures' });
    }
};

//Sample Query: http://localhost:3000/fixtures/headtohead?h2h=52-42 (faulty)
const getTeamHeadToHead = async (req, res) => {
    try {
        const data = await fixturesModel.getFixtures(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch head to head' });
    }
};

//Sample Query: http://localhost:3000/fixtures/statistics?fixture=867947 (faulty)
const getTeamStatistics = async (req, res) => {
    try {
        const data = await fixturesModel.getFixtures(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};

//Sample Query: http://localhost:3000/fixtures/statistics?fixture=867947 (faulty)
const getTeamEvents = async (req, res) => {
    try {
        const data = await fixturesModel.getFixtures(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

//Sample Query: http://localhost:3000/fixtures/lineups?fixture=867947 (faulty)
const getTeamLineups = async (req, res) => {
    try {
        const data = await fixturesModel.getFixtures(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lineups' });
    }
};

//Sample Query: http://localhost:3000/fixtures/players?fixture=867947
const getTeamPlayersStatistics = async (req, res) => {
    try {
        const data = await fixturesModel.getFixtures(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player statistics' });
    }
};

module.exports = {
    getRounds,
    getFixtures,
    getTeamHeadToHead,
    getTeamStatistics,
    getTeamEvents,
    getTeamLineups,
    getTeamPlayersStatistics
};