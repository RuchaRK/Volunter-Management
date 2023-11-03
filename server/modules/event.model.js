const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  roleSpecificVolunteers: [
    {
      role: {
        type: String,
        required: true,
      },
      volunteers: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
