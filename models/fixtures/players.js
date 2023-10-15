const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  games: {
    minutes: Number,
    number: Number,
    position: String,
    rating: String,
    captain: Boolean,
    substitute: Boolean,
  },
  offsides: Number,
  shots: {
    total: Number,
    on: Number,
  },
  goals: {
    total: Number,
    conceded: Number,
    assists: Number,
    saves: Number,
  },
  passes: {
    total: Number,
    key: Number,
    accuracy: String,
  },
  tackles: {
    total: Number,
    blocks: Number,
    interceptions: Number,
  },
  duels: {
    total: Number,
    won: Number,
  },
  dribbles: {
    attempts: Number,
    success: Number,
    past: Number,
  },
  fouls: {
    drawn: Number,
    committed: Number,
  },
  cards: {
    yellow: Number,
    red: Number,
  },
  penalty: {
    won: Number,
    commited: Number,
    scored: Number,
    missed: Number,
    saved: Number,
  },
});

const playerDetailsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  photo: String,
});

const playerSchema = new mongoose.Schema({
  player: playerDetailsSchema,
  statistics: [statisticsSchema],
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  update: Date,
});

const fixturePlayersSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  teams: [
    {
      team: teamSchema,
      players: [playerSchema],
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const playersModel =
  mongoose.models.FixturePlayers ||
  mongoose.model('FixturePlayers', fixturePlayersSchema);

module.exports = playersModel;
