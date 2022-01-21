// DEPENDENCIES
const express = require('express');
const axios = require('axios');
const cors = require('cors');
// OTHER FILES
const config = require('./config');
const keys = require('./keys');
// access config settings with config.{category}.{setting}
// access yelp keys with keys.yelp.clientID & keys.yelp.APIKey

const app = express();
const port = config.server.port;

app.use(cors());

// USER FILTERS - hardcoded for now
const distance = 5; //in miles
const types = ['Chinese', 'Greek', 'Mexican'];
const priceRange = [2,3]; //price range ([2,3] is $$ and $$$ only)
const requirements = {
  requireOpenNow: false,
  requireDoesPickup: false,
  requireDoesDelivery: false
}

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
  const yelpAPIEndpoint = 'https://api.yelp.com/v3/businesses/search' + buildSearch(req.params.location, distance, types, priceRange, requirements.requireOpenNow);

  axios.get(yelpAPIEndpoint, {
    headers: {
      'Authorization' : 'Bearer ' + keys.yelp.APIKey
    }

  }).then((yelpRes) => {
    // Build response data object
    const responseData = {
      'restaurants': [],
      'total': Math.min(parseInt(yelpRes.data.total), config.results.resultsSize)
    };
    // Loop thru results
    yelpRes.data.businesses.forEach(restaurant => {
      // Apply filters
      if (restaurant.is_closed) return;
      if (requirements.requireDoesPickup) {
        if (!restaurant.transactions.includes('pickup')) return;
      }
      if (requirements.requireDoesDelivery) {
        if (!restaurant.transactions.includes('delivery')) return;
      }
      // Add restaurant to response data
      responseData.restaurants.push({
        'name': restaurant.name,
        'image_url': restaurant.image_url,
        'review_avg': restaurant.rating,
        'review_count': restaurant.review_count,
        'cuisine': restaurant.categories[0].title,
        'price': restaurant.price,
        'address': restaurant.location.display_address.join(' '),
        'phone': restaurant.phone,
        'display_phone': restaurant.display_phone,
        'distance': (restaurant.distance / 1609.344) //in miles
      });
    });
    // Send response data
    res.status(200).json(responseData).end();

  }).catch((yelpErr) => {
    // Send error msg otherwise
    res.status(500).send("Error sending request to yelp.").end();
  });
});

app.listen(port, () => {
  if (!keys.yelp.APIKey) {
    console.log('Error: Missing or incorrectly formatted keys.js file!\n' +
      'See bite-backend/README.md for instructions.\n');
    process.exit();
  }

  console.log('Server listening at http://localhost:' + port);
});