/*Requiring Packages*/
require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var reverse = require('reverse-geocode');

/*Requiroing the Keys.js file*/
const keys = require("./keys.js");

/*Creating an instance of the Spotify constructor*/
var spotifyKeys = new Spotify(keys.spotify);

/*Creating user input variables*/
var input = process.argv;
var firstInput = input[2];
var secondInput = [];

/*Allowing the user to request information for movies, songs or concerts that is more than one word*/
for (var i = 3 ; i < input.length ; i++) {
    secondInput.push(input[i]);
}

/*Start of Concert-This Function*/
var concertThis = function(artist){
    if(artist === undefined || artist == null || artist.length <= 0){
        console.log("Liri can't guess ... which artist are you looking for?");
        
    } else {
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
        function(response) {
            var lat = response.data[0].venue.latitude;
            var long = response.data[0].venue.longitude;
            var city = reverse.lookup(lat, long, 'us').city;
            var state = reverse.lookup(lat, long, 'us').state_abbr;
            var zipCode = reverse.lookup(lat, long, 'us').zipcode;
            var venueName = response.data[0].venue.name;
            var concertDate = moment(response.data[0].datetime).format("MM/DD/YYYY");

            console.log("Name of the venue: " + venueName + "\n" + 
                        "Venue location: "  + city + ", " + state + " " + zipCode + "\n" +
                        "Date of the Event: "  + concertDate + "\n");

            fs.appendFile("log.txt", "\n" +
                          "Name of the venue: " + venueName + "\n" +
                          "Venue location: "  + city + ", " + state + " " + zipCode + "\n" +
                          "Date of the Event: "  + concertDate + "\n" + 
                          "-----------------------------------------------------------", function(err) {
                if (err) {
                    return console.log(err);
                }
                });

        });
    }
}/*End of Concert-This Function*/

/*Start of Spotify-This Function*/
var spotifyThis = function(song){
    if(song === undefined || song == null || song.length <= 0){
        spotifyKeys.search({ type: 'track', query: "Ace of Base" }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }

            var artistName = data.tracks.items[0].artists[0].name;
            var songName = data.tracks.items[0].name;
            var album = data.tracks.items[0].album.name;
            var previewLink = data.tracks.items[0].external_urls.spotify;

            console.log("Artist(s): " + artistName); 
            console.log("Song Name: " + songName);
            console.log("Album: " + album); 
            console.log("Preview Link: " + previewLink); 

            fs.appendFile("log.txt", "\n" +
            "Artist(s): " + artistName + "\n" +
            "Song Name: "  + songName + "\n" +
            "Album: " + album + "\n" +
            "Preview Link: "  + previewLink + "\n" + 
            "-----------------------------------------------------------", function(err) {
                if (err) {
                    return console.log(err);
                }
                });

          });
        
    } else {
        spotifyKeys.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            var artistName = data.tracks.items[0].artists[0].name;
            var songName = data.tracks.items[0].name;
            var album = data.tracks.items[0].album.name;
            var previewLink = data.tracks.items[0].external_urls.spotify;

            console.log("Artist(s): " + artistName); 
            console.log("Song Name: " + songName);
            console.log("Album: " + album); 
            console.log("Preview Link: " + previewLink); 

            fs.appendFile("log.txt", "\n" +
            "Artist(s): " + artistName + "\n" +
            "Song Name: "  + songName + "\n" +
            "Album: " + album + "\n" +
            "Preview Link: "  + previewLink + "\n" + 
            "-----------------------------------------------------------", function(err) {
                if (err) {
                    return console.log(err);
                }
                }); 
          });
    }
}/*End of Spotify-This Function*/

/*Start of Movie-This Function*/
var movieThis = function(movie){
    if(movie === undefined || movie == null || movie.length <= 0){
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody.&y=&plot=short&apikey=trilogy")
        .then(function(response) {
            var movieTitle = response.data.Title;
            var relaseYear = response.data.Year;
            var IMDBRating = response.data.imdbRating;
            var rottenTomatoesRating = response.data.Ratings[1].Value;
            var prodCountry = response.data.Country ;
            var movieLanguage = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;

            console.log("Title: " + movieTitle + "\n" + 
            "Releasing Year: " + relaseYear + "\n" +
            "IMDB Rating: " + IMDBRating  + "\n" +
            "Rotten Tomatoes Rating: " + rottenTomatoesRating + "\n" +
            "Producing Country: " + prodCountry + "\n" +
            "Language of the movie: " + movieLanguage + "\n" +
            "Plot: " + plot + "\n" +
            "Actors: " + actors);

            fs.appendFile("log.txt", "\n" +
            "Title: " + movieTitle + "\n" + 
            "Releasing Year: " + relaseYear + "\n" +
            "IMDB Rating: " + IMDBRating  + "\n" +
            "Rotten Tomatoes Rating: " + rottenTomatoesRating + "\n" +
            "Producing Country: " + prodCountry + "\n" +
            "Language of the movie: " + movieLanguage + "\n" +
            "Plot: " + plot + "\n" +
            "Actors: " + actors + "\n" + 
            "-----------------------------------------------------------", function(err) {
                if (err) {
                    return console.log(err);
                }
                }); 


        });
        
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(function(response) {
            var movieTitle = response.data.Title;
            var relaseYear = response.data.Year;
            var IMDBRating = response.data.imdbRating;
            var rottenTomatoesRating = response.data.Ratings[1].Value;
            var prodCountry = response.data.Country ;
            var movieLanguage = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;

            console.log("Title: " + movieTitle + "\n" + 
            "Releasing Year: " + relaseYear + "\n" +
            "IMDB Rating: " + IMDBRating  + "\n" +
            "Rotten Tomatoes Rating: " + rottenTomatoesRating + "\n" +
            "Producing Country: " + prodCountry + "\n" +
            "Language of the movie: " + movieLanguage + "\n" +
            "Plot: " + plot + "\n" +
            "Actors: " + actors);

            fs.appendFile("log.txt", "\n" +
            "Title: " + movieTitle + "\n" + 
            "Releasing Year: " + relaseYear + "\n" +
            "IMDB Rating: " + IMDBRating  + "\n" +
            "Rotten Tomatoes Rating: " + rottenTomatoesRating + "\n" +
            "Producing Country: " + prodCountry + "\n" +
            "Language of the movie: " + movieLanguage + "\n" +
            "Plot: " + plot + "\n" +
            "Actors: " + actors + "\n" + 
            "-----------------------------------------------------------", function(err) {
                if (err) {
                    return console.log(err);
                }
                }); 
        });
    } 
} /*End of Movie-This Function*/

/*Start of Do-What-It-Says Function*/
var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if(err) throw err;
        console.log(data);

        var dataArr = data.split(",");

        if (dataArr.length == 2) {
            order(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            order(dataArr[0]);
        }
    })
}/*End of Do-What-It-Says Function*/

/*Start of User Order Function*/
var order = function(userOrder, inputToInquire){
    switch(userOrder) {
        case "concert-this":
            concertThis(inputToInquire);
            break;
    
        case "spotify-this-song":
            spotifyThis(inputToInquire);
            break;
        
        case "movie-this":
            movieThis(inputToInquire);
            break;
        
        case "do-what-it-says":
            doWhatItSays();
            break;
    
        default:
        console.log("Liri does not know this. Try something else!");
    }
}/*End of User Order Function*/

/*Start of Run Function*/
var run = function(arg1, arg2){
    order(arg1, arg2);
}/*End of Run Function*/

/*Call of Run Function*/
run(firstInput, secondInput);

