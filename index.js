const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Import your routes
const leaguesRoutes = require('./routes/leagues');
const teamsRoutes = require('./routes/teams');
const venuesRoutes = require('./routes/venues');
const standingsRoutes = require('./routes/standings');
const fixturesRoutes = require('./routes/fixtures');
const playersRoutes = require('./routes/players');
const predictionsRoutes = require('./routes/predictions');
const newsRoutes = require('./routes/news');

// Connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Failed to connect to database', err));

// Set up routes
app.use('/leagues', leaguesRoutes);
app.use('/teams', teamsRoutes);
app.use('/venues', venuesRoutes);
app.use('/standings', standingsRoutes);
app.use('/fixtures', fixturesRoutes);
app.use('/players', playersRoutes);
app.use('/predictions', predictionsRoutes);
app.use('/news', newsRoutes);

// Home route
app.get('/', (_, res) => {
  res.send(
    'SportScore back-end server, view manual for a list of all endpoints'
  );
});

// Start the server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running at port ${process.env.PORT || 8080}`);
});
