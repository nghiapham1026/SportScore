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

// Games Schema
const gamesSchema = new mongoose.Schema({
  appearences: Number,
  lineups: Number,
  minutes: Number,
  number: Number,
  position: String,
  rating: String,
  captain: Boolean,
});

// Substitutes Schema
const substitutesSchema = new mongoose.Schema({
  in: Number,
  out: Number,
  bench: Number,
});

// Shots Schema
const shotsSchema = new mongoose.Schema({
  total: Number,
  on: Number,
});

// Goals Schema
const goalsSchema = new mongoose.Schema({
  total: Number,
  conceded: Number,
  assists: Number,
  saves: Number,
});

// Passes Schema
const passesSchema = new mongoose.Schema({
  total: Number,
  key: Number,
  accuracy: Number,
});

// Tackles Schema
const tacklesSchema = new mongoose.Schema({
  total: Number,
  blocks: Number,
  interceptions: Number,
});

// Duels Schema
const duelsSchema = new mongoose.Schema({
  total: Number,
  won: Number,
});

// Dribbles Schema
const dribblesSchema = new mongoose.Schema({
  attempts: Number,
  success: Number,
  past: Number,
});

// Fouls Schema
const foulsSchema = new mongoose.Schema({
  drawn: Number,
  committed: Number,
});

// Cards Schema
const cardsSchema = new mongoose.Schema({
  yellow: Number,
  yellowred: Number,
  red: Number,
});

// Penalty Schema
const penaltySchema = new mongoose.Schema({
  won: Number,
  commited: Number,
  scored: Number,
  missed: Number,
  saved: Number,
});

// Statistics Schema
const statisticsSchema = new mongoose.Schema({
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

// Scorer Schema
const scorerSchema = new mongoose.Schema({
  player: playerSchema,
  statistics: [statisticsSchema],
});

// Grouped Scorer Schema
const groupedScorerSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  topScorers: [scorerSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Scorer =
  mongoose.models.Scorer || mongoose.model('Scorer', groupedScorerSchema);

module.exports = Scorer;
