const mongoose = require('mongoose');

const coverageSchema = new mongoose.Schema({
  fixtures: {
    events: Boolean,
    lineups: Boolean,
    statistics_fixtures: Boolean,
    statistics_players: Boolean,
  },
  standings: Boolean,
  players: Boolean,
  top_scorers: Boolean,
  top_assists: Boolean,
  top_cards: Boolean,
  injuries: Boolean,
  predictions: Boolean,
  odds: Boolean,
});

const seasonSchema = new mongoose.Schema({
  year: Number,
  start: Date,
  end: Date,
  current: Boolean,
  coverage: coverageSchema,
});

const countrySchema = new mongoose.Schema({
  name: String,
  code: String,
  flag: String,
});

const leagueSchema = new mongoose.Schema(
  {
    league: {
      id: Number,
      name: String,
      type: String,
      logo: String,
    },
    country: countrySchema,
    seasons: [seasonSchema],
  },
  { typeKey: '$type' }
);

const groupedLeagueSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  allLeagues: [leagueSchema],
});

const League =
  mongoose.models.League || mongoose.model('League', groupedLeagueSchema);

module.exports = League;
