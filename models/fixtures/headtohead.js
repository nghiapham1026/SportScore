const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  city: String,
});

const statusSchema = new mongoose.Schema({
  long: String,
  short: String,
  elapsed: Number,
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  winner: Boolean,
});

const goalsSchema = new mongoose.Schema({
  home: Number,
  away: Number,
});

const scoreSchema = new mongoose.Schema({
  halftime: goalsSchema,
  fulltime: goalsSchema,
  extratime: goalsSchema,
  penalty: goalsSchema,
});

const leagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  logo: String,
  flag: String,
  season: Number,
  round: String,
});

const headToHeadFixtureSchema = new mongoose.Schema(
  {
    fixture: {
      id: Number,
      referee: String,
      timezone: String,
      date: Date,
      timestamp: Number,
      periods: {
        first: Number,
        second: Number,
      },
      venue: venueSchema,
      status: statusSchema,
    },
    league: leagueSchema,
    teams: {
      home: teamSchema,
      away: teamSchema,
    },
    goals: goalsSchema,
    score: scoreSchema,
  },
  { typeKey: '$type' }
);

const groupedHeadToHeadFixtureSchema = new mongoose.Schema({
  queryParams: mongoose.Schema.Types.Mixed,
  allHeadToHeadFixtures: [headToHeadFixtureSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const HeadToHeadModel =
  mongoose.models.groupedHeadToHeadFixture ||
  mongoose.model('GroupedHeadToHeadFixture', groupedHeadToHeadFixtureSchema);

module.exports = HeadToHeadModel;
