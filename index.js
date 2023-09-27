const express = require('express');
const app = express();
const leaguesRoutes = require('./routes/leagues');
const teamsRoutes = require('./routes/teams');
require("dotenv").config();

app.use('/leagues', leaguesRoutes);
app.use('/teams', teamsRoutes);

app.listen(process.env.port, () => {
    console.log(`Server is running on http://localhost:${process.env.port}`);
});