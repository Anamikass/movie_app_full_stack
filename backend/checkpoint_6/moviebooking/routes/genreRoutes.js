// routes/genre.routes.js
const express = require("express");
const genresController = require("../controllers/genreController");

const router = express.Router();

// Define the route for getting all genres
router.get("/", genresController.findAllGenres);

// Export the router
module.exports = router;
