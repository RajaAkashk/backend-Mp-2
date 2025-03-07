const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Successfully conected to database."))
    .catch(() => console.error("Error occured while connecting to database."));
};

module.exports = { initializeDatabase };
