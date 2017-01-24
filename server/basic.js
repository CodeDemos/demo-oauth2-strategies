const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const app = express();

app.use('/', express.static('build'));

app.get('/', (req, res) => {
  res.json({
    message: 'basic strategy!',
  });
});

// ===== basicStrategy =====
const basicStrategy = new BasicStrategy((username, password, callback) => {
    // NB 'callback' is 'verified()' a function built-in to passport
  if (!username || username !== 'guest') {
    return callback(null, false, {
      message: 'Incorrect username.',
    });
  }
  if (!password || password !== 'letmein') {
    return callback(null, false, {
      message: 'Incorrect password.',
    });
  }
  return callback(null, username);
});

passport.use(basicStrategy);
app.get('/auth/basic', passport.authenticate('basic', {
  session: false,
}), (req, res) => {
  res.json({
    message: 'Luke... I am your father',
  });
});

app.listen(3000, () => {
  console.log('Listening at 3000!');
});
