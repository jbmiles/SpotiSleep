const express = require('express');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');
const secrets = require("./secrets.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

app.post('/setTimer', function(req, res) {
  const time = req.body.time;
  setTimeout(() =>{

  }, time);
})
