const mongoose = require('mongoose');

// Birth Schema
const birthSchema = new mongoose.Schema({
  date: String,
  place: String,
  country: String,
});

// Player Schema
const playerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  firstname: String,
  lastname: String,
  age: Number,
  birth: birthSchema,
  nationality: String,
  height: String,
  weight: String,
  injured: Boolean,
  photo: String,
});

// Team Schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
});

// League Schema
const leagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  logo: String,
  flag: String,
  season: Number,
});

// Nested Schemas for Statistics
const gamesSchema = new mongoose.Schema({
  appearences: Number,
  lineups: Number,
  minutes: Number,
  number: Number,
  position: String,
  rating: String,
  captain: Boolean,
});

const substitutesSchema = new mongoose.Schema({
  in: Number,
  out: Number,
  bench: Number,
});

const shotsSchema = new mongoose.Schema({
  total: Number,
  on: Number,
});

const goalsSchema = new mongoose.Schema({
  total: Number,
  conceded: Number,
  assists: Number,
  saves: Number,
});

const passesSchema = new mongoose.Schema({
  total: Number,
  key: Number,
  accuracy: Number,
});

const tacklesSchema = new mongoose.Schema({
  total: Number,
  blocks: Number,
  interceptions: Number,
});

const duelsSchema = new mongoose.Schema({
  total: Number,
  won: Number,
});

const dribblesSchema = new mongoose.Schema({
  attempts: Number,
  success: Number,
  past: Number,
});

const foulsSchema = new mongoose.Schema({
  drawn: Number,
  committed: Number,
});

const cardsSchema = new mongoose.Schema({
  yellow: Number,
  yellowred: Number,
  red: Number,
});

const penaltySchema = new mongoose.Schema({
  won: Number,
  commited: Number,
  scored: Number,
  missed: Number,
  saved: Number,
});

// Statistics Schema
const assistsStatisticsSchema = new mongoose.Schema({
  team: teamSchema,
  league: leagueSchema,
  games: gamesSchema,
  substitutes: substitutesSchema,
  shots: shotsSchema,
  goals: goalsSchema,
  passes: passesSchema,
  tackles: tacklesSchema,
  duels: duelsSchema,
  dribbles: dribblesSchema,
  fouls: foulsSchema,
  cards: cardsSchema,
  penalty: penaltySchema,
});

// Assist Schema
const assistSchema = new mongoose.Schema({
  player: playerSchema,
  statistics: [assistsStatisticsSchema],
});

// Grouped Assist Schema
const groupedAssistSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  allAssists: [assistSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const Assist =
  mongoose.models.Assist || mongoose.model('Assist', groupedAssistSchema);

module.exports = Assist;
