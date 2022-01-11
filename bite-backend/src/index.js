const express = require('express');
const keysfile = require('./keys');
// access keys with keysfile.keys.clientID & keysfile.keys.APIKey

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World! ');
});

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port);
});