const express = require('express');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');
const secrets = require("./secrets.js");
const path = require('path');
const app = express();
const spotifyApi = new spotifyWebApi(secrets);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.redirect('/getAuth');
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});

app.get("/getAuth", function(req, res) {
  const scopes = ["user-modify-playback-state"];
  const state = "this-some-state-yo"
  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

app.get("/redirect", function(req, res) {
  spotifyApi.authorizationCodeGrant(req.query.code)
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    setInterval(function() {
        spotifyApi.setAccessToken(globalAccessToken);
        spotifyApi.setRefreshToken(globalRefreshToken);
        spotifyApi.refreshAccessToken()
        .then(function(data) {
          console.log('The access token has been refreshed!');

          spotifyApi.setAccessToken(data.body['access_token']);
          globalAccessToken = data.body['access_token'];
        }, function(err) {
          console.log('Could not refresh access token', err);
        });
      },1800000)
  }, err => {
    console.log('Something went wrong!', err);
  });
  res.sendFile('./timer.html', {root: __dirname+'/public' });
});

app.post('/setTimer', function(req, res) {
  const time = req.body.time;
  console.log("timer set!");
  console.log(time);
  setTimeout(() =>{
    spotifyApi.pause()
    .then(data => {
        console.log("paused!");
    });
  }, time);
  res.send('timer set');
})
