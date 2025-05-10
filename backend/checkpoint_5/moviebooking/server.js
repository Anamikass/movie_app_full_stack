// Load required libraries
const mongoose = require("mongoose");
const { DB_URL } = require("./config/dbconfig"); // Import dbConfig
require("dotenv").config(); // Load environment variables from .env file

// Connect to MongoDB using dbConfig
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit(1); // Exit the process with an error code
  });

