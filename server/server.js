const express = require('express');

const app = express();

app.use('/', express.static('build'));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from express!',
  });
});

app.listen(3000, () => {
  console.log('Listening at 3000!');
});
