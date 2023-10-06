const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  city: String,
  capacity: Number,
  surface: String,
  image: String,
});

const individualTeamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  code: String,
  country: String,
  founded: Number,
  national: Boolean,
  logo: String,
});

const groupedTeamsSchema = new mongoose.Schema(
  {
    queryParams: mongoose.Schema.Types.Mixed,
    allTeams: [
      {
        team: individualTeamSchema,
        venue: venueSchema,
      },
    ],
  },
  { typeKey: '$type' }
);

const Team = mongoose.models.GroupedTeams || mongoose.model('GroupedTeams', groupedTeamsSchema);

module.exports = Team;
