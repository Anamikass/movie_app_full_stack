// routes/movie.routes.js
const express = require("express");
const {
  findAllMovies,
  findOne,
  findShows,
} = require("../controllers/movieController");

const router = express.Router();

// Route for fetching all movies
router.get("/", async (req, res) => {
  try {
    await findAllMovies(req, res);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching movies." });
  }
});

// Route for fetching a specific movie by ID
router.get("/:id", async (req, res) => {
  try {
    await findOne(req, res);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching the movie." });
  }
});

// Route for fetching shows for a specific movie
router.get("/:id/shows", async (req, res) => {
  try {
    await findShows(req, res);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while fetching shows for the movie.",
    });
  }
});

// Export the router
module.exports = router;
