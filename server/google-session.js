var express = require('express');
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var app = express();

var session = require('express-session');
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user)
});
passport.deserializeUser(function(user, done){
    done(null, user)
});

app.use('/', express.static('build'));

app.get('/', function (req, res) {
    res.json({
        message: 'google strategy'
    })
});

passport.use(new GoogleStrategy({
        //BEST PRACTICE: move to process.env
        clientID: '43640532528-uhilvmr6bjh6crafbrc40cd9p48juph8.apps.googleusercontent.com',
        clientSecret: 'K46mFEHNisbU0IY7yqRg5wGL',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        //console.log(accessToken, refreshToken, profile)
        return cb(null, profile);
    }
));

// Authentication GET requests
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        // session: false
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('req.user', req.user)
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    console.log('req.user before', req.user)
    req.logout();
    console.log('req.user after', req.user)
    res.redirect('/');
});

app.listen(3000, function () {
    console.log('Listening at 3000!');
});