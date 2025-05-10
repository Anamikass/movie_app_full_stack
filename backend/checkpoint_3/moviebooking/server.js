// Entry point for the Node application.
// Handles movie-related API endpoints initially, using Express for routing.
// Endpoints will be organized in separate route files for maintainability later.

const express = require("express");
const app = express();

// Initial route handlers for GET requests

app.get("/movies", (req, res) => {
  res.send("All Movies Data in JSON format from MongoDB");
});

app.get("/genres", (req, res) => {
  res.send("All Genres Data in JSON format from MongoDB");
});

app.get("/artists", (req, res) => {
  res.send("All Artists Data in JSON format from MongoDB");
});

// The port number will be moved to a config file for easier management

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
