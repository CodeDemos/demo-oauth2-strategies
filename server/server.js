var express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var app = express();

app.use('/', express.static('build'));

app.get('/', function (req, res) {
  res.json({
    message: 'Hello from express!'
  })
});

app.listen(3000, function () {
  console.log('Listening at 3000!');
});