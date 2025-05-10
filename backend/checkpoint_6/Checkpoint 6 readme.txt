-- Check point 6 

//--------------------------------------------------------------------------------------
//-------------------------------PART 1-------------------------------------------------
//--------------------------------------------------------------------------------------

1.  Remove or comment the code inside Server.js as the hard coded routes  
    will be changed to pattern based routes using express now.

We would now add code to server.js file. 

a. Load express and create an express app object.
b. Load cors module. 
   Please note that our node-express apis are going to be called 
   from React or POSTMAN or Swagger. 
   CORS allows another application to call our apis.

c. Set the default route for the index or root path i.e /
   Something like :
   app.get("/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

e. Set the PORT and start the server ( i.e LISTEN on PORT for request )

> Refer server.js 

f. run below command by being in current application folder.
   node server.js

g. Open browser and type "http://localhost:8085/" 
   see to it that you get output on browser as 
   
   "{"message":"Welcome to Upgrad Movie booking application development."}"

Now move to part 2 below:
//--------------------------------------------------------------------------------------
//-------------------------------PART 2-------------------------------------------------
//--------------------------------------------------------------------------------------


2. Code the controllers/movieController.js for following api's
      findAllMovies() - to search the movie by status.
      findOne() - to fetch all details of a movie given its id.
      findShows() - to fetch details of shows of specific  movie given its id.
      > Refer controllers/movieController.js

3. Code the controllers/artistController.js for following api's
      findAllArtists() - to get all Artists.

      > Refer controllers/artistController.js

4. Code the controllers/genreController.js for following api's
      findAllGenres() - to get all Genres.

      > Refer controllers/genreController.js

5. Code the routes file(s) 

      a) routes/movieRoutes.js.  
         
            Follow the routes and methods as 

            (considering base URL as http://localhost:3000/api):

            GET /movies

            GET /movies?status=PUBLISHED

            GET /movies?status=RELEASED

            GET /movies/{movieId}

            GET /movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}

      b) routes/genreRoutes.js.  
         
            Follow the routes and methods as 

            (considering base URL as http://localhost:3000/api):

            GET /genres

      b) routes/artistRoutes.js.  
         
            Follow the routes and methods as 

            (considering base URL as http://localhost:3000/api):

            GET /artists


6. Now, run below command on command prompt 
   > node server.js

   open browser and test above routes to check if data appears in JSON format.
   You can also test the routes using Postman


In the next checkpoint; we will handle user model related routes 

