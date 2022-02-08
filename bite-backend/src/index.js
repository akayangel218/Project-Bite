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

function buildSearch(location, distance, openNow, priceRange, cuisine) {
  let search = '?term=restaurants' +
    '&sort_by=' + 'best_match' +
    '&limit=' + config.results.resultsSize +
    '&location=' + location +
    '&radius=' + (distance * 1609) +
    '&open_now=' + openNow;

  if (priceRange) {
    search += '&price=' + priceRange;
  }
  if (cuisine) {
    search += '&categories=' + cuisine;
  }
  return search;
}

// Full: /restaurants/{location}/{distance}/{open_now}/{doesPickup}/{doesDelivery}?price={}&rating={}&cuisine={}
// Exp param types:    string     int        bool       bool         bool          int arr  int arr   string arr
// Example: "/restaurants/santa cruz/5/true/false/false?price=2,3&rating=3,4,5&cuisine=chinese,thai"
app.get('/restaurants/:location/:distance/:open_now/:doesPickup/:doesDelivery', (req, res) => {

  const yelpAPIEndpoint = 'https://api.yelp.com/v3/businesses/search' + buildSearch(req.params.location, req.params.distance, req.params.open_now, req.query.price, req.query.cuisine);

  axios.get(yelpAPIEndpoint, {
    headers: {
      'Authorization' : 'Bearer ' + keys.yelp.APIKey
    }

  }).then((yelpRes) => {
    // Build response data object
    const responseData = {
      'restaurants': []
    };
    // Get rating options as array
    let stars = ['1', '2', '3', '4', '5'];
    if (req.query.rating) {
      stars = req.query.rating.split(',');
    }
    // Loop thru results
    yelpRes.data.businesses.forEach(restaurant => {
      // Apply filters
      if (restaurant.is_closed) return;
      if (!stars.includes(Math.floor(restaurant.rating).toString())) return;
      if (req.params.doesPickup) {
        if (!restaurant.transactions.includes('pickup')) return;
      }
      if (req.params.doesDelivery) {
        if (!restaurant.transactions.includes('delivery')) return;
      }

      // Get cuisine categories list
      const cuisineList = [];
      restaurant.categories.forEach(category => {
        cuisineList.push(category.title);
      });

      // Add restaurant to response data
      responseData.restaurants.push({
        'name': restaurant.name,
        'image_url': restaurant.image_url,
        'review_avg': restaurant.rating,
        'review_count': restaurant.review_count,
        'cuisine': cuisineList,
        'price': restaurant.price,
        'address': restaurant.location.display_address.join(' '),
        'phone': restaurant.phone,
        'display_phone': restaurant.display_phone,
        'distance': (restaurant.distance / 1609.344) //in miles
      });
    });
    // Save number of restaurants returned
    responseData['total'] = Math.min(parseInt(responseData.restaurants.length), config.results.resultsSize)
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
