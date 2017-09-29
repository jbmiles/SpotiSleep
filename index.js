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

app.get('/', (req, res) => {
  res.redirect('/getAuth');
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});

app.get("/getAuth", (req, res) => {
  const scopes = ["user-modify-playback-state"];
  const state = "this-some-state-yo"
  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

app.get("/redirect", (req, res) => {
  authorizeCode(req.query.code);
  res.sendFile('./timer.html', {root: __dirname+'/public' });
});

app.post('/setTimer', (req, res) => {
  const time = req.body.time;
  console.log("timer set!");
  console.log(time);
  setTimeout(async () => {
    await spotifyApi.pause()
    console.log("paused!");
  }, time);
  res.send('timer set');
})

async function authorizeCode(code) {
  const data = await spotifyApi.authorizationCodeGrant(code);
  spotifyApi.setAccessToken(data.body['access_token']);
  spotifyApi.setRefreshToken(data.body['refresh_token']);
  setInterval(async function() {
      const data2 = await spotifyApi.refreshAccessToken()
      console.log('The access token has been refreshed!');

      spotifyApi.setAccessToken(data2.body['access_token']);
  },1500000)
  return;
}
