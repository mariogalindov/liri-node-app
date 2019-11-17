# liri-node-app

The liri app works like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

The app, as previously stated is a command line node app, the required packages are available in the package.json file
The app requires: 
* Node of course 
* Axios (to work with the Bands in Town and OMDB API's)
* Node-Spotify-API package
* Moment to have proper date formats
* Node fs module in order to read and append data to files
* DotEnv to store your spotify keys

The four main commands are the following ones: 
1. concert-this 
2. spotify-this-song
3. movie-this
4. do-what-it-says 

In order to run the app you must use the liri.js file in node and then enter any of the commands. 

## concert-this ## 

This command uses **Axios** to use the **Bands in Town** API, the sintax is node liri.js concert-this <artist/band name here>

This will display the following information: 
* Name of the venue
* City
* Country
* Date
* Lineup in case there are several bands playing together

## spotify-this-song ## 

This command uses the **Node-Spotify-API** node package, the sintaxis is node liri.js spotify-this-song '<songname here>'

This will bring the following information: 
* Artist(s)
* Name of the song
* A preview link of the song from Spotify
* The album of the song

If no song is given to the app, this command by default will display the information for the song My Sweet Shadow by In Flames.

## movie-this ## 

This command also uses **Axios** to use the **OMDB** API, the sintaxis is node liri.js movie-this '<movie name here>'

This will bring the following information: 
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

If no movie is given to the app, this command by default will display the information for the movie Mr. Nobody.

## do-what-it-says ##

This command uses the node fs module to read information from the random.txt file. By default the command stated in the file is spotify-this-song Nothing Else Matters Metallica.

All the commands are stored in a log.txt using Node fs module.

