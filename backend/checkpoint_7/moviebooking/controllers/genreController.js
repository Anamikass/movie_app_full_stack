// Load the schema models
const {Genre} = require("../models/genreModel"); // Directly import the Genre model

// Function to retrieve all genres
const findAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find(); // Fetch all genres
    res.status(200).send({ genres }); // Send response with genres
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving genres.",
    });
  }
};

// Export the functions for use in routes
module.exports = {
  findAllGenres,
};
