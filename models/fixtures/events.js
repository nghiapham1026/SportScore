const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  elapsed: Number,
  extra: mongoose.Schema.Types.Mixed,
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
});

const playerSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const eventSchema = new mongoose.Schema(
  {
    time: timeSchema,
    team: teamSchema,
    player: playerSchema,
    assist: playerSchema,
    type: String,
    detail: String,
    comments: mongoose.Schema.Types.Mixed,
  },
  { typeKey: '$type' }
);

const groupedFixtureEventsSchema = new mongoose.Schema(
  {
    queryParams: mongoose.Schema.Types.Mixed,
    allFixtureEvents: [eventSchema],
    updatedAt: {
        type: Date,
        default: Date.now
      }
  },
  { typeKey: '$type' }
);

const eventsModel =
  mongoose.models.GroupedFixtureEvents ||
  mongoose.model('GroupedFixtureEvents', groupedFixtureEventsSchema);

module.exports = eventsModel;
