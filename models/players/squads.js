const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  number: Number,
  position: String,
  photo: String,
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
});

const squadSchema = new mongoose.Schema({
  team: teamSchema,
  players: [playerSchema],
});

const groupedSquadSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  allSquads: [squadSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Squad =
  mongoose.models.Squad || mongoose.model('Squad', groupedSquadSchema);

module.exports = Squad;
