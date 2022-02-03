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

function buildSearch(location, distance, types, priceRage, openNow) {
  let search = '?term=restaurants' + '&limit=' + config.results.resultsSize;
  if (location != "") {
    search += '&location=' + location;
  }
  if (distance != "") {
    search += '&radius=' + (distance * 1609);
  }
  if (types != "") {
    search += '&categories=' + types;
  }
  if (priceRage != "") {
    search += '&price=' + priceRage;
  }
  if (openNow) {
    search += '&open_now=' + openNow;
  }
  return search;
}

app.get('/restaurants/:location/:radius/:categories/:price/:open_now/:doesPickup/:doesDelivery', (req, res) => {
  const yelpAPIEndpoint = 'https://api.yelp.com/v3/businesses/search' + buildSearch(req.params.location, req.params.radius, req.params.categories, req.params.price, req.params.open_now);

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
      if (req.params.doesPickup) {
        if (!restaurant.transactions.includes('pickup')) return;
      }
      if (req.params.doesDelivery) {
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
