const Event = require("../modules/event.model.js");

async function showAllEvents() {
  try {
    return await Event.find();
  } catch (error) {
    throw new Error(error);
  }
}

async function showAEvent(eventId) {
  try {
    return await Event.findById(eventId);
  } catch (error) {
    throw new Error(error);
  }
}

async function addNewEvent(EventData) {
  try {
    const event = new Event(EventData);
    await event.save();
    return await showAllEvents();
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteEvent(EventId) {
  try {
    await Event.findByIdAndDelete(EventId);
    return await showAllEvents();
  } catch (error) {
    throw new Error(error);
  }
}

async function updateEvent(EventId, updateData) {
  try {
    await Event.findByIdAndUpdate(EventId, updateData);
    return await showAllEvents();
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  showAEvent,
  showAllEvents,
  addNewEvent,
  updateEvent,
  deleteEvent,
};
