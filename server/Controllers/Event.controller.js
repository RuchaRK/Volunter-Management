const express = require("express");

const eventRouter = express.Router();

const {
  showAEvent,
  showAllEvents,
  addNewEvent,
  updateEvent,
  deleteEvent,
} = require("../Services/event.services");

eventRouter.get("/", async (req, res) => {
  try {
    const allEvents = await showAllEvents();
    res.status(200).json({ message: "Success", allEvents });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

eventRouter.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await showAEvent(eventId);
    res.status(200).json({ message: "Success", event });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

eventRouter.post("/", async (req, res) => {
  try {
    const newEventData = req.body;
    const allEvents = await addNewEvent(newEventData);
    res.status(200).json({ message: "Success", allEvents });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

eventRouter.delete("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const allEvents = await deleteEvent(eventId);
    res.status(200).json({ message: "Success", allEvents });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

eventRouter.post("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const updateData = req.body;

    const allEvents = await updateEvent(eventId, updateData);
    res.status(200).json({ message: "Success", allEvents });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching data.",
      error: error.message,
    });
  }
});

module.exports = eventRouter;
