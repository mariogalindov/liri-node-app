require("dotenv").config();

// Spotify API keys retrieval from the keys file
var keys = require("./keys.js");

// Global variables

var axios = require("axios");
var moment = require("moment");
var fs = require("fs")

    //Spotify setup with keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var command = process.argv[2];
var val = ""; 
// var input = nodeArgs.slice(3).join(" ")
// console.log(input);

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of the characters that will fill the blank spaces 
for (var i = 3; i < nodeArgs.length; i++) {
    // console.log(i);

  if (i > 3 && i < nodeArgs.length) {
    val = val + " " + nodeArgs[i];
    // console.log(val)
    // console.log(i)
  } else {
    val += nodeArgs[i];

  }
}

// concert-this function
var bandsInTown = function() {
    
    var artist = val;
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // console.log(concertURL);

    axios.get(concertURL).then(
    function(response) {
        var info = response.data
        
        info.forEach(element => {
            console.log(`Venue: ${element.venue.name}\nCity: ${element.venue.city}\nCountry: ${element.venue.country}\nDate: ${moment(element.datetime).format("MM/DD/YYYY")}\nLineup: ${element.lineup}\n-------------------------------`);
        });
        
    })
    .catch(function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

// spotify-this-song function
var spotifyThis = function() {
    // console.log(val)

    if (val !== ""){
        spotify.search({ type: 'track', query: val }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          var track = data.tracks.items;    
          track.forEach(element => {
            element.artists.forEach(element => {
                console.log("Artists: ", element.name)
            });
            console.log(`Song: ${element.name} \nURL: ${element.preview_url} \nAlbum: ${element.album.name}\n`)
          });
        })
    } else {
        spotify.search({ type: 'track', query: "The Sign Ace of Base"}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          var track = data.tracks.items;    
          track.forEach(element => {
            element.artists.forEach(element => {
                console.log("Artists: ", element.name)
            });
            console.log(`Song: ${element.name} \nURL: ${element.preview_url} \nAlbum: ${element.album.name}\n`)
          });
        })
    }
};


//movie-this function
var movieThis = function() {

    if (val !== "") {
      var movie = val;
      var queryURL = "http://omdbapi.com/?apikey=e264beba&t=" + movie
      
      
      axios.get(queryURL).then(
      function(response) {

        var movieData = response.data

        console.log(`Title: ${movieData.Title} \nYear: ${movieData.Year} \nIMDB Rating: ${movieData.Ratings[0].Value} \nRotten Tomatoes Rating: ${movieData.Ratings[1].Value} \nCountry: ${movieData.Country} \nLanguage: ${movieData.Language} \nPlot: ${movieData.Plot} \nActors: ${movieData.Actors}`)

          
      })
      .catch(function(error) {
          if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
          } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
          } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          }
          console.log(error.config);
      });
        
    } else {
      axios.get("http://omdbapi.com/?apikey=e264beba&t=Mr. Nobody.").then(
        function(response) {
  
          var movieData = response.data
  
          console.log(`Title: ${movieData.Title} \nYear: ${movieData.Year} \nIMDB Rating: ${movieData.Ratings[0].Value} \nRotten Tomatoes Rating: ${movieData.Ratings[1].Value} \nCountry: ${movieData.Country} \nLanguage: ${movieData.Language} \nPlot: ${movieData.Plot} \nActors: ${movieData.Actors}`)
  
            
        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
    }
}

var doWhatItSays = function() {

  fs.readFile("random.txt", "utf8", function(error, data) {

    if(error) {
      console.log(error)
    } console.log(data)

  })

}


//   The goddamn switch 

switch (command){
    case "concert-this":
        bandsInTown();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;
    
    case  "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}