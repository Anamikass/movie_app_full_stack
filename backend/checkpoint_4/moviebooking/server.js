// Load required libraries
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { DB_URL } = require("./config/dbconfig"); // Import dbConfig
require("dotenv").config(); // Load environment variables from .env file

// Create an Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));

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

// Load routes
const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const artistRoutes = require("./routes/artistRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/movies", movieRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
  });
});

// Set port and start listening for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
