const {Artist} = require("../models/artistModel"); // Ensure the path is correct

// Define the function to retrieve all artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find(); // Call find on the Artist model
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving artists", error });
  }
};

// Export the functions individually
module.exports = {
  getAllArtists,
};
