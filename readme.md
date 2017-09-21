# SpotiSleep

A small nodejs app that pauses spotify after a certain amount of time.
to run it, clone the repo, run `npm install` and then run `node index.js`
the app will then be hosted at localhost:3000.


To run it, you'll need to make a file called secrets.js, that looks like this
```
module.exports = {
    clientId: clientIDHERE,
    clientSecret: clientSecretHERE,
    redirectUri: "http://localhost:3000/redirect"
}

```
To get a clientId and secret, visit [here](https://developer.spotify.com/my-applications/#!/applications).

Great for playing music while you sleep!
