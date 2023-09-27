const standingsModel = require('../models/standings');

//Sample Query: http://localhost:3000/standings?league=39&season=2022
const getStandings = async (req, res) => {
    try {
        const data = await standingsModel.getStandings(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch standings' });
    }
};

module.exports = {
    getStandings
};