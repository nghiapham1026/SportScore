const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  type: String,
  value: mongoose.Schema.Types.Mixed, // Mixed type since value can be a number or a string (like "32%")
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
});

const fixtureStatisticsSchema = new mongoose.Schema(
  {
    team: teamSchema,
    statistics: [statisticSchema],
  },
  { typeKey: '$type' }
);

const groupedFixtureStatisticsSchema = new mongoose.Schema(
  {
    queryParams: mongoose.Schema.Types.Mixed,
    allFixtureStatistics: [fixtureStatisticsSchema],
    updatedAt: {
        type: Date,
        default: Date.now
      }
  },
  { typeKey: '$type' }
);

const statisticsModel =
  mongoose.models.GroupedFixtureStatistics ||
  mongoose.model('GroupedFixtureStatistics', groupedFixtureStatisticsSchema);

module.exports = statisticsModel;
