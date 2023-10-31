const express = require("express");

require("dotenv").config();
require("./db");

const PORT = process.env.PORT || 3001;

const app = express();

const volunteerRouter = require("./Controllers/Volunteer.controller");
const eventRouter = require("./Controllers/Event.controller");

app.use(express.json());

app.use("/api/volunteers", volunteerRouter);

app.use("/api/events", eventRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
