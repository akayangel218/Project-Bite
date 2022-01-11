const express = require('express');
const configfile = require('./config');
const keysfile = require('./keys');
// access config settings with configfile.config.{setting}
// access keys with keysfile.keys.clientID & keysfile.keys.APIKey

const app = express();
const port = configfile.config.port;

app.get('/', (req, res) => {
  res.send('Hello World! ');
});

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port);
});