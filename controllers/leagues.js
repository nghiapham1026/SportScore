const leaguesModel = require('../models/leagues');

//Sample Query: http://localhost:3000/leagues?id=39&season=2022
const getLeagues = async (req, res) => {
    try {
        const data = await leaguesModel.getLeagues(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leagues' });
    }
};

//Sample Query: http://localhost:3000/leagues/seasons
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