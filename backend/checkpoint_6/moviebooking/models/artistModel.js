const mongoose = require("mongoose");

// Define the Artist schema
const ArtistSchema = new mongoose.Schema(
  {
    artistId: {
      type: Number,
      required: true, // Ensures artistId is required
      unique: true, // Ensures artistId is unique
    },
    first_name: {
      type: String,
      required: true, // Ensures first name is required
      trim: true, // Removes whitespace
    },
    last_name: {
      type: String,
      required: true, // Ensures last name is required
      trim: true, // Removes whitespace
    },
    wiki_url: {
      type: String,
      default: "https://www.mongodb.com/mern-stack",
      validate: {
        validator: (v) => /^(https?:\/\/[^\s]+)$/.test(v), // Validates URL format
        message: (props) => `${props.value} is not a valid URL!`, // Custom error message
      },
    },
    profile_url: {
      type: String,
      default:
        "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
      validate: {
        validator: (v) => /^(https?:\/\/[^\s]+)$/.test(v), // Validates URL format
        message: (props) => `${props.value} is not a valid URL!`, // Custom error message
      },
    },
    movies: {
      type: [String], // Array of strings representing movie titles
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Artist model
const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = {Artist, ArtistSchema};
