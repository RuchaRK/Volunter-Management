const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  history: {
    type: String,
  },
  interestAreas: {
    type: [String],
    required: true,
  },
  assignedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
