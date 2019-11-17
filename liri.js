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
var bandsInTown = function(band) {
  fs.appendFile("log.txt", `${command} ${band} @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`, function(error) {
    if (error) {
      console.log(error)
    } 
  });
    
    // var artist = val;
    var concertURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
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
var spotifyThis = function(song) {
  fs.appendFile("log.txt", `${command} ${song} @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`, function(error) {
    if (error) {
      console.log(error)
    } 
  });

    if (song !== ""){
        spotify.search({ type: 'track', query: song }, function(err, data) {
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
    } else if (song == "") {

      fs.appendFile("log.txt", `${command} (empty) My Sweet Shadow - In Flames  @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`, function(error) {
        if (error) {
          console.log(error)
        } 
      });
        spotify.search({ type: 'track', query: "In Flames My Sweet Shadow "}, function(err, data) {
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
var movieThis = function(movie) {
  fs.appendFile("log.txt", `${command} ${movie} @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`, function(error) {
    if (error) {
      console.log(error)
    } 
  });

    if (movie !== "") {
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

      fs.appendFile("log.txt", `${command} (empty) Mr. Nobody  @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`, function(error) {
        if (error) {
          console.log(error)
        } 
      });

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
  fs.appendFile("log.txt", `${command} @ ${moment().format('MMMM Do YYYY, h:mm:ss a')}\n`, function(error) {
    if (error) {
      console.log(error)
    } 
  });

  fs.readFile("random.txt", "utf8", function(error, data) {

    if(error) {
      console.log(error);
    } 
    var dataArray = data.split(", ");
    // console.log(dataArray);
    console.log(dataArray[1])
    var arraySong = dataArray[1]
    spotifyThis(arraySong);

  })

}


//   The goddamn switch 

switch (command){
    case "concert-this":
        bandsInTown(val);
        break;

    case "spotify-this-song":
        spotifyThis(val);
        break;
    
    case  "movie-this":
        movieThis(val);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
    console.log("Please enter a valid command");
}