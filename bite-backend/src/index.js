// DEPENDENCIES
const express = require('express');
const axios = require('axios');
// OTHER FILES
const config = require('./config');
const keys = require('./keys');
// access config settings with config.{category}.{setting}
// access yelp keys with keys.yelp.clientID & keys.yelp.APIKey

const app = express();
const port = config.server.port;

// USER FILTERS - hardcoded for now
const distance = 5; //in miles
const types = ['Chinese', 'Greek', 'Mexican'];
const priceRange = [2,3]; //price range ([2,3] is $$ and $$$ only)
const openNow = false;

function buildSearch(location, distance, types, priceRage, openNow) {
  let search = '?term=restaurants' + 
    '&location=' + location + 
    '&radius=' + (distance * 1609) + 
    '&categories=' + types.join(',').toLowerCase() +
    '&limit=' + config.results.resultsSize +
    '&price=' + priceRage.join(',') +
    '&open_now=' + openNow;
  return search;
}

app.get('/restaurants/:location', (req, res) => {
  const yelpAPIEndpoint = 'https://api.yelp.com/v3/businesses/search' + buildSearch(req.params.location, distance, types, priceRange, openNow);

  axios.get(yelpAPIEndpoint, {
    headers: {
      'Authorization' : 'Bearer ' + keys.yelp.APIKey
    }
  }).then((yelpRes) => {
    res.status(200).json(yelpRes.data).end();
  }).catch((yelpErr) => {
    res.status(500).send("Error sending request to yelp.").end();
  })
});

app.listen(port, () => {
  if (!keys.yelp.APIKey) {
    console.log('Error: Missing or incorrectly formatted keys.js file!\n' +
      'See bite-backend/README.md for instructions.\n');
    process.exit();
  }

  console.log('Server listening at http://localhost:' + port);
});