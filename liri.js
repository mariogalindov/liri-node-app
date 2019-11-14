require("dotenv").config();

// Spotify API keys retrieval from the keys file
var keys = require("./keys.js");

// Global variables
var inquirer = require("inquirer"); //Is this needed? 

var axios = require("axios");
var moment = require("moment");

    //Spotify setup with keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var command = process.argv[2];
var val = ""; 

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of the characters that will fill the blank spaces 
for (var i = 3; i < nodeArgs.length; i++) {
    console.log(i);

  if (i > 3 && i < nodeArgs.length) {
    val = val + "%20" + nodeArgs[i];
    console.log(val)
    console.log(i)
  } else {
    val += nodeArgs[i];
    console.log(val)

  }
}

console.log(val);


// Bands in town command
var bandsInTown = function() {
    var artist = val;
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(concertURL);

    axios.get(concertURL).then(
    function(response) {
        var info = response.data
        
        info.forEach(element => {
            console.log(`Venue: ${element.venue.name}
                        City:  ${element.venue.city}
                        Country: ${element.venue.country}
                        Date: ${moment(element.datetime).format("MM/DD/YYYY")}`);
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

var spotifyThis = function() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks);
      
      });

}

//   The goddamn switch 

switch (command){
    case "concert-this":
        bandsInTown();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;
    
    case  "total":
        total(input);
        break;

    case "lotto":
        lotto();
        break;

}