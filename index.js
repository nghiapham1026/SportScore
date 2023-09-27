const express = require('express');
const app = express();
const leaguesRoutes = require('./routes/leagues');
const teamsRoutes = require('./routes/teams');

const PORT = 3000;

app.use('/leagues', leaguesRoutes);
app.use('/teams', teamsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});