const mongoose = require('mongoose');

// Defining the schema for events
const eventSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  startDate: String,
  startTime: String,
  category: String,
  type: String,
  insideUniversity: { type: Boolean},
  state: String,
  place: String,
  locationLink: String,
  locationDescription: String,
  appName: String,
  appLink: String
});

// Creating a Mongoose model based on the event schema
const Event = mongoose.model('Event', eventSchema);

// Exporting the Event model
module.exports = Event;
