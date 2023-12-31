const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    date: {
      type: String, // Assuming the date is in ISO string format
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true, // Set to false if the image is not mandatory
    },
    topics: {
      // New field for topics
      type: [String], // Array of strings
      required: true, // Set to false if the topics are not mandatory
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
); // Enable timestamps

const News = mongoose.model('News', newsSchema);

module.exports = News;
