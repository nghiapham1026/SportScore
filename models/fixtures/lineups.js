const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
  pos: String,
  grid: String,
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  colors: {
    player: {
      primary: String,
      number: String,
      border: String,
    },
    goalkeeper: {
      primary: String,
      number: String,
      border: String,
    },
  },
});

const coachSchema = new mongoose.Schema({
  id: Number,
  name: String,
  photo: String,
});

const lineupSchema = new mongoose.Schema({
  team: teamSchema,
  formation: String,
  startXI: [playerSchema],
  substitutes: [playerSchema],
  coach: coachSchema,
});

const groupedFixtureLineupsSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  allFixtureLineups: [lineupSchema],
});

const LineupsModel =
  mongoose.models.GroupedFixtureLineups ||
  mongoose.model('GroupedFixtureLineups', groupedFixtureLineupsSchema);

module.exports = LineupsModel;
