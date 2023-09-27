const express = require('express');
require("dotenv").config();

const app = express();

const leaguesRoutes = require('./routes/leagues');
const teamsRoutes = require('./routes/teams');
const venuesRoutes = require('./routes/venues');
const standingsRoutes = require('./routes/standings');
const fixturesRoutes = require('./routes/fixtures');

app.use('/leagues', leaguesRoutes);
app.use('/teams', teamsRoutes);
app.use('/venues', venuesRoutes);
app.use('/standings', standingsRoutes);
app.use('/fixtures', fixturesRoutes);

app.listen(process.env.port, () => {
    console.log(`Server is running on http://localhost:${process.env.port}`);
});