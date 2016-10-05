var express = require('express');
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var app = express();

app.use('/', express.static('build'));

app.get('/public', function (req, res) {
    res.json({
        message: 'google strategy'
    })
});

passport.use(new GoogleStrategy({
        clientID: '43640532528-uhilvmr6bjh6crafbrc40cd9p48juph8.apps.googleusercontent.com',
        clientSecret: 'K46mFEHNisbU0IY7yqRg5wGL',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log('=======', accessToken);
        //TODO: find or create here, then run callback with user
        var user = {
            googleId: profile.id,
            accessToken: accessToken,
            displayName: profile.displayName,
            name: profile.name
        };
        return cb(null, user);
    }
));

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.cookie('accessToken', req.user.accessToken, {expires:0});    
        res.redirect('/public');
    });


passport.use(new BearerStrategy(
    function (token, done) {
        console.log('token', token);
        //TODO: find user with token then run callback with user        
        // if (token == 'Ci9zA8DD8I8WGVOuSTGWxT6j5liMz9buxSOFh9nHvam2docwk') {
        if (token == '12345') {
            var user = {user: 'bob'};
            return done(null, user, {scope: 'read'});
        } else {
            return done(null, false);
        }
    }
));

app.get('/questions', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json({german:'asdfasdf'});
  });

// app.get('/logout', function (req, res) {
//     console.log('req.user before', req.user)
//     req.logout();
//     console.log('req.user after', req.user)
//     res.redirect('/');
// });

app.listen(3000, function () {
    console.log('Listening at 3000!');
});