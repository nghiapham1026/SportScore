const mongoose = require('mongoose');

// Sub-schemas
const winnerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  comment: String,
});

const predictionGoalsSchema = new mongoose.Schema({
  home: String,
  away: String,
});

const predictionsSchema = new mongoose.Schema({
  winner: winnerSchema,
  win_or_draw: Boolean,
  under_over: String,
  goals: predictionGoalsSchema,
  advice: String,
  percent: mongoose.Schema.Types.Mixed,
});

const teamLast5GoalsSchema = new mongoose.Schema({
  for: mongoose.Schema.Types.Mixed,
  against: mongoose.Schema.Types.Mixed,
});

const teamLast5Schema = new mongoose.Schema({
  form: String,
  att: String,
  def: String,
  goals: teamLast5GoalsSchema,
});

const leagueGoalsSchema = new mongoose.Schema({
  for: mongoose.Schema.Types.Mixed,
  against: mongoose.Schema.Types.Mixed,
});

const leagueBiggestSchema = new mongoose.Schema({
  streak: mongoose.Schema.Types.Mixed,
  wins: mongoose.Schema.Types.Mixed,
  loses: mongoose.Schema.Types.Mixed,
  goals: mongoose.Schema.Types.Mixed,
});

const leagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  logo: String,
  flag: String,
  season: Number,
  form: String,
  fixtures: mongoose.Schema.Types.Mixed,
  goals: leagueGoalsSchema,
  biggest: leagueBiggestSchema,
  clean_sheet: mongoose.Schema.Types.Mixed,
  failed_to_score: mongoose.Schema.Types.Mixed,
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  last_5: teamLast5Schema,
  league: leagueSchema,
});

const comparisonSchema = new mongoose.Schema({
  form: mongoose.Schema.Types.Mixed,
  att: mongoose.Schema.Types.Mixed,
  def: mongoose.Schema.Types.Mixed,
  poisson_distribution: mongoose.Schema.Types.Mixed,
  h2h: mongoose.Schema.Types.Mixed,
  goals: mongoose.Schema.Types.Mixed,
  total: mongoose.Schema.Types.Mixed,
});

const scoreSchema = new mongoose.Schema({
  halftime: mongoose.Schema.Types.Mixed,
  fulltime: mongoose.Schema.Types.Mixed,
  extratime: mongoose.Schema.Types.Mixed,
  penalty: mongoose.Schema.Types.Mixed,
});

const h2hFixtureSchema = new mongoose.Schema({
  id: Number,
  referee: String,
  timezone: String,
  date: String,
  timestamp: Number,
  periods: mongoose.Schema.Types.Mixed,
  venue: mongoose.Schema.Types.Mixed,
  status: mongoose.Schema.Types.Mixed,
});

const h2hLeagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  logo: String,
  flag: String,
  season: Number,
  round: String,
});

const h2hTeamsSchema = new mongoose.Schema({
  home: teamSchema,
  away: teamSchema,
});

const h2hSchema = new mongoose.Schema({
  fixture: h2hFixtureSchema,
  league: h2hLeagueSchema,
  teams: h2hTeamsSchema,
  goals: mongoose.Schema.Types.Mixed,
  score: scoreSchema,
});

// Main schema
const predictionSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  allPredictions: [
    {
      predictions: predictionsSchema,
      league: leagueSchema,
      teams: {
        home: teamSchema,
        away: teamSchema,
      },
      comparison: comparisonSchema,
      h2h: [h2hSchema],
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Prediction =
  mongoose.models.Prediction || mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
