const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  venueId: Number,
  name: String,
  address: String,
  city: String,
  country: String,
  capacity: Number,
  surface: String,
  image: String,
});

const groupedVenueSchema = new mongoose.Schema(
  {
    queryParams: mongoose.Schema.Types.Mixed,
    allVenues: [venueSchema],
    updatedAt: {
        type: Date,
        default: Date.now
      }
  },
);

const Venue =
  mongoose.models.Venue || mongoose.model('Venue', groupedVenueSchema);

module.exports = Venue;
