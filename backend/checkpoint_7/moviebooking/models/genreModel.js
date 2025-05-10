const mongoose = require("mongoose");

// Define the Genre schema
const GenreSchema = new mongoose.Schema(
  {
    genreId: {
      type: Number,
      required: true, // Ensures genreId is required
      unique: true, // Ensures genreId is unique
    },
    genre: {
      type: String,
      required: true, // Ensures genre name is required
      //trim: true, // Removes whitespace from the beginning and end
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Genre model
const Genre = mongoose.model("Genre", GenreSchema);
module.exports = { Genre, GenreSchema };
