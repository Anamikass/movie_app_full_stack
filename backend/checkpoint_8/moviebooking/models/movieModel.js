// models/movie.model.js

const mongoose = require("mongoose");
const { ArtistSchema } = require("./artistModel");
const { GenreSchema } = require("./genreModel");
const { Schema } = mongoose;
const MovieSchema = new Schema(
  {
    movieId: { type: Number, required: true, unique: true }, // Enforce uniqueness
    title: { type: String, required: true }, // Required field
    published: { type: Boolean, default: false }, // Default to false
    released: { type: Boolean, default: false }, // Default to false
    poster_url: {
      type: String,
      default:
        "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
    },
    trailer_url: {
      type: String,
      default: "https://www.youtube.com/watch?v=MTdpHs6HWwM",
    },
    wiki_url: {
      type: String,
      default: "https://www.mongodb.com/mern-stack",
    },
    release_date: { type: String },
    publish_date: { type: String },
    duration: { type: Number, default: 60, min: 0, max: 1200 }, // Duration in minutes
    critic_rating: { type: Number, default: 4.0, min: 0, max: 5.0 }, // Rating between 0 and 5
    story_line: { type: String },
    artists: [], // Reference to Artist model
    genres: [], // Reference to genre schema
    shows: [], // Could be improved based on your specific use case
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
