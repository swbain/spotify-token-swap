var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    request = require('request');

app.listen(3000);
app.use(bodyParser.json());

var client_id = '39d7c757ebcf41ad8f3dad74cb8def34';
var client_secret = 'b5876264945d4afc94a156be9ce3ea4d';
var redirect_uri = "spotifydiscog://callback"

app.get('/get_token', function(req, res) {
  var code = req.query.code;
  var options = {
    url : "https://accounts.spotify.com/api/token",
    method : 'post',
    json : true,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    },
    form : {
      "grant_type" : "authorization_code",
      "code" : code,
      "redirect_uri" : redirect_uri,
      "client_id" : client_id,
      "client_secret" : client_secret
    }
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
      console.log("success getting token");
    }else {
      res.sendStatus(response.statusCode);
      console.log("error getting token, error " + response.statusCode);
    }
  })
});

app.get('/refresh', function(req, res) {

  var refresh_token = req.query.refresh_token;

  var options = {
      url : "https://accounts.spotify.com/api/token",
      method : 'post',
      json : true,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      form : {
        "grant_type" : "refresh_token",
        "refresh_token" : refresh_token,
        "redirect_uri" : redirect_uri,
        "client_id" : client_id,
        "client_secret" : client_secret
      }
  }
  request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
        console.log("success refreshing token");
      }else {
        res.sendStatus(response.statusCode);
        console.log("error refreshing token, code " + response.statusCode);
      }
    })
});