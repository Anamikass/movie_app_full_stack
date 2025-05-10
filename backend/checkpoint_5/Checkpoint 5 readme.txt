-- Check point 5 

1. Define the Schema according to Client requirements. 

>  refer models/artistModel.js 

>  refer models/genreModel.js 

>  refer models/movieModel.js 

>  refer models/userModel.js 




2. In the server.js , we would later add more code.  
For backend programming only below code is needed in server.js.

// Load required libraries
const mongoose = require("mongoose");
const { DB_URL } = require("./config/dbconfig"); // Import dbConfig
require("dotenv").config(); // Load environment variables from .env file

// Connect to MongoDB using dbConfig
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit(1); // Exit the process with an error code
  });




// refer server.js for changes

3. Run below command on command prompt to test is connectivity to Mongo DB is successful!
>  node server.js
 