const mongoose = require('mongoose');

// Season Schema
const seasonSchema = new mongoose.Schema({
  year: Number
});

// PlayerSeasons Schema (to store all seasons associated with a player, if needed)
const playerSeasonsSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  seasons: [seasonSchema], // Array of season years
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

// If you want to store a list of seasons for each player
const Seasons = mongoose.models.Seasons || mongoose.model('PlayerSeasons', playerSeasonsSchema);

module.exports = Seasons;
