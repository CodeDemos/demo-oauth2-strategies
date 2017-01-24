const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const app = express();

app.use('/', express.static('build'));

passport.use(new GoogleStrategy({
  clientID: '43640532528-uhilvmr6bjh6crafbrc40cd9p48juph8.apps.googleusercontent.com',
  clientSecret: 'K46mFEHNisbU0IY7yqRg5wGL',
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Add find or create here
  const user = {
    googleId: profile.id,
    accessToken,
    displayName: profile.name,
  };
  return done(null, user);
}));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
      res.cookie('accessToken', req.user.accessToken, { expires: 0 });
      res.redirect('/#/quiz');
    });

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/home');
});


passport.use(new BearerStrategy(
    (accessToken, done) => {
      console.log('token', accessToken);
    //   User.findOne({ accessToken })
    //         .then(user => done(null, user, { scope: 'read' }));
    },
));

app.get('/api/questions', passport.authenticate('bearer', { session: false }),
    (req, res) => {
      res.json({
        message: 'respond with list of questions',
      });
    });

app.listen(3000, () => {
  console.log('Listening at 3000!');
});
