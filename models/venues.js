const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    venueId: Number,
    name: String,
    address: String,
    city: String,
    country: String,
    capacity: Number,
    surface: String,
    image: String
});

const groupedVenueSchema = new mongoose.Schema({
    allVenues: [venueSchema]
},
{ typeKey: '$type' });

module.exports = mongoose.model('Venue', groupedVenueSchema);