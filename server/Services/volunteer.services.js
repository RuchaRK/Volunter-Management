const Volunteer = require("../modules/volunteer.model");

async function showAllVolunteers() {
  try {
    const allVolunteers = await Volunteer.find().populate(
      "assignedWard",
      "specializations wardNumber"
    );

    return allVolunteers;
  } catch (error) {
    throw new Error(error);
  }
}

async function showAVolunteer(volunteerId) {
  try {
    const volunteer = await Volunteer.findById(volunteerId);
    return volunteer;
  } catch (error) {
    throw new Error(error);
  }
}

async function addNewVolunteer(volunteerData) {
  try {
    const volunteer = new Volunteer(volunteerData);
    await volunteer.save();
    const allVolunteers = await showAllVolunteers();
    return allVolunteers;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteVolunteer(volunteerId) {
  try {
    await Volunteer.findByIdAndDelete(volunteerId);
    const allVolunteers = await showAllVolunteers();
    return allVolunteers;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateVolunteer(volunteerId, updateData) {
  try {
    await Volunteer.findByIdAndUpdate(volunteerId, updateData);
    const allVolunteers = await showAllVolunteers();
    return allVolunteers;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  showAllVolunteers,
  showAVolunteer,
  updateVolunteer,
  deleteVolunteer,
  addNewVolunteer,
};
