// controllers/movie.controller.js
const Artist = require("../models/artistModel");
const Genre = require("../models/genreModel");
const Movies = require("../models/movieModel");

// Function to handle errors
const handleError = (res, err, defaultMessage) => {
  res.status(500).send({
    message: err.message || defaultMessage,
  });
};

// Function to find all movies with optional filtering
const findAllMovies = async (req, res) => {
  try {
    let condition = {};

    // Check for status in query parameters
    if (req.query.status) {
      if (req.query.status === "RELEASED") {
        condition.released = true;
      } else if (req.query.status === "PUBLISHED") {
        condition.published = true;
      }
    }

    // Check for title if status is "RELEASED"
    if (req.query.title && req.query.status === "RELEASED") {
      condition.title = req.query.title;
    }

    // Add additional filters based on query parameters if necessary
    // Example: condition.genres = req.query.genres; // Uncomment and adjust as needed

    const movies = await Movies.find(condition);
    res.send({ movies });
  } catch (err) {
    handleError(res, err, "Some error occurred while retrieving movies.");
  }
};

// Function to find a single movie by ID
const findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = await Movies.findOne({ movieid: id });
    if (!movie) {
      return res.status(404).send({ message: `Not found Movie with id ${id}` });
    }

    res.send(movie);
  } catch (err) {
    handleError(res, err, `Error retrieving Movie with id=${req.params.id}`);
  }
};

// Function to find shows for a specific movie by ID
const findShows = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = await Movies.findOne({ movieid: id });
    if (!movie) {
      return res.status(404).send({ message: `Not found Movie with id ${id}` });
    }
    console.log(movie);
    res.send(movie.shows); // Return the shows directly
  } catch (err) {
    handleError(
      res,
      err,
      `Error retrieving Shows for movie with id=${req.params.id}`
    );
  }
};

// Exporting the functions
module.exports = {
  findAllMovies,
  findOne,
  findShows,
};
