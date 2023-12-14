const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
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

// Health check endpoint
app.get('/healthcheck', (_, res) => {
    // Perform necessary health checks here
    res.status(200).send('Server is healthy');
});

// Home route
app.get('/', (_, res) => {
  res.send('SportScore back-end server, view manual for a list of all endpoints');
});

// Schedule a task to run every day at 8:00 AM
cron.schedule('0 0 * * *', async () => {
    try {
        // Replace with your server's health check endpoint
        const response = await axios.get(`${process.env.SERVER_URL}/healthcheck`);
        console.log('Daily health check successful:', response.status);
    } catch (err) {
        console.error('Error during daily health check:', err);
    }
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running`);
});
  