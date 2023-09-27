const venuesModel = require('../models/venues');

//Sample Query: http://localhost:3000/venues?country=Spain
const getVenues = async (req, res) => {
    try {
        const data = await venuesModel.getVenues(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch venues' });
    }
};

module.exports = {
    getVenues
};