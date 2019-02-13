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
var concertThis = function(){}/*End of Concert-This Function*/

/*Start of Spotify-This Function*/
var spotifyThis = function(){}/*End of Spotify-This Function*/

/*Start of Movie-This Function*/
var movieThis = function(){} /*End of Movie-This Function*/

/*Start of Do-What-It-Says Function*/
var doWhatItSays = function(){}/*End of Do-What-It-Says Function*/

/*Start of User Order Function*/
var order = function(userOrder, inputToInquire){
    switch(userOrder) {
        case "concert-this":
            console.log("concertThis()");
            break;
    
        case "spotify-this-song":
            console.log("spotifyThis()");
            break;
        
        case "movie-this":
            console.log("movieThis()");
            break;
        
        case "do-what-it-says":
            console.log("doWhatItSays()");
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

