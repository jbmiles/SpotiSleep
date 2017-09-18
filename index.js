const express = require('express');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');
const secrets = require("./secrets.js");
const app = express();
console.log(secrets);
const spotifyApi = new spotifyWebApi(secrets);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get("/getAuth", function(req, res) {
  const scopes = ["user-modify-playback-state"];
  const state = "this-some-state-yo"
  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

app.get("/redirect", function(req, res) {
  console.log(req.body);
  spotifyApi.authorizationCodeGrant(req.body.code)
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  }, err => {
    console.log('Something went wrong!', err);
  });
  res.send("Redirect!");
});

app.post('/setTimer', function(req, res) {
  const time = req.body.time;
  setTimeout(() =>{
    spotifyApi.pause()
    .then(data => {
        console.log("paused!");
    });
  }, time);
})
