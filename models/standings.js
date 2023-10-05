const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  for: Number,
  against: Number,
});

const recordSchema = new mongoose.Schema({
  played: Number,
  win: Number,
  draw: Number,
  lose: Number,
  goals: goalsSchema,
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
});

const standingSchema = new mongoose.Schema({
  rank: Number,
  team: teamSchema,
  points: Number,
  goalsDiff: Number,
  group: String,
  form: String,
  status: String,
  description: String,
  all: recordSchema,
  home: recordSchema,
  away: recordSchema,
  update: Date,
});

const leagueStandingSchema = new mongoose.Schema(
  {
    queryParams: mongoose.Schema.Types.Mixed,
    league: {
      id: Number,
      name: String,
      country: String,
      logo: String,
      flag: String,
      season: Number,
    },
    standings: [[standingSchema]], // Nested array as per the provided data
  },
  { typeKey: '$type' }
);

module.exports = mongoose.model('LeagueStanding', leagueStandingSchema);
