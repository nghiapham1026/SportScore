const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const leaguesRoutes = require('./routes/leagues');
const teamsRoutes = require('./routes/teams');
const venuesRoutes = require('./routes/venues');
const standingsRoutes = require('./routes/standings');
const fixturesRoutes = require('./routes/fixtures');
const playersRoutes = require('./routes/players');

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Failed to connect to database', err));

app.use('/leagues', leaguesRoutes);
app.use('/teams', teamsRoutes);
app.use('/venues', venuesRoutes);
app.use('/standings', standingsRoutes);
app.use('/fixtures', fixturesRoutes);
app.use('/players', playersRoutes);

app.get('/', (_, res) => {
  res.send(
    'SportScore back-end server, view manual for a list of all endpoints'
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running`);
});
