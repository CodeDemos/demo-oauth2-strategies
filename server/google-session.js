const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();


app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', express.static('build'));

app.get('/', (req, res) => {
  res.json({
    message: 'google strategy',
  });
});

passport.use(new GoogleStrategy({
        // BEST PRACTICE: move to process.env
  clientID: '43640532528-uhilvmr6bjh6crafbrc40cd9p48juph8.apps.googleusercontent.com',
  clientSecret: 'K46mFEHNisbU0IY7yqRg5wGL',
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
    (accessToken, refreshToken, profile, cb) => 
        // console.log(accessToken, refreshToken, profile)
       cb(null, profile),
));

// Authentication GET requests
app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile'],
    }),
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
        // session: false
    }),
    (req, res) => {
        // Successful authentication, redirect home.
      console.log('req.user', req.user);
      res.redirect('/');
    });

app.get('/logout', (req, res) => {
  console.log('req.user before', req.user);
  req.logout();
  console.log('req.user after', req.user);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Listening at 3000!');
});
