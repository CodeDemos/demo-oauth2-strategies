var express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var app = express();

app.use('/', express.static('build'));

app.get('/', function (req, res) {
    res.json({
        message: 'basic strategy!'
    })
});

// ===== basicStrategy =====
var basicStrategy = new BasicStrategy(function (username, password, callback) {
    // NB 'callback' is 'verified()' a function built-in to passport 
    if (!username || username != 'guest') {
        return callback(null, false, {
            message: 'Incorrect username.'
        });
    }
    if (!password || password != 'letmein') {
        return callback(null, false, {
            message: 'Incorrect password.'
        });
    }
    return callback(null, username);
});

passport.use(basicStrategy);
app.get('/auth/basic', passport.authenticate('basic', {
    session: false
}), function (req, res) {
    res.json({
        message: 'Luke... I am your father'
    });
});

app.listen(3000, function () {
    console.log('Listening at 3000!');
});