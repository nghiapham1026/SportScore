const leaguesModel = require('../models/leagues');

const getLeagues = async (req, res) => {
    try {
        const data = await leaguesModel.getLeagues(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leagues' });
    }
};

const getSeasons = async (req, res) => {
    try {
        const data = await leaguesModel.getSeasons(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch seasons' });
    }
};

module.exports = {
    getLeagues,
    getSeasons
};