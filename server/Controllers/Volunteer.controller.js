const express = require("express");

const volunteerRouter = express.Router();

const {
  showAllVolunteers,
  showAVolunteer,
  updateVolunteer,
  deleteVolunteer,
  addNewVolunteer,
} = require("../Services/volunteer.services");

volunteerRouter.get("/", async (req, res) => {
  try {
    const allVolunteers = await showAllVolunteers();
    res.status(200).json({ message: "Success", allVolunteers });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

volunteerRouter.get("/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const volunteer = await showAVolunteer(volunteerId);
    res.status(200).json({ message: "Success", volunteer });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

volunteerRouter.post("/", async (req, res) => {
  try {
    const newVolunteerData = req.body;
    const allVolunteers = await addNewVolunteer(newVolunteerData);
    res.status(200).json({ message: "Success", allVolunteers });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

volunteerRouter.delete("/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const allVolunteers = await deleteVolunteer(volunteerId);
    console.log(allVolunteers);
    res.status(200).json({ message: "Success", allVolunteers });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

volunteerRouter.post("/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const updateData = req.body;
    const allVolunteers = await updateVolunteer(volunteerId, updateData);

    res.status(200).json({ message: "Success", allVolunteers });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

module.exports = volunteerRouter;
