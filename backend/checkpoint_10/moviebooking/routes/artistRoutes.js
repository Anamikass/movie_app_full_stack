const express = require("express");
const { getAllArtists } = require("../controllers/artistController");

const router = express.Router();

// Define routes for artists
router.get("/", getAllArtists);

// Export the router for use in server.js
module.exports = router;
