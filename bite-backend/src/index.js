// DEPENDENCIES
const express = require('express');
const axios = require('axios');
const cors = require('cors');
// OTHER FILES
const config = require('./config');
const keys = require('./keys');
const util = require('./util');
// access config settings with config.{category}.{setting}
// access yelp keys with keys.yelp.clientID & keys.yelp.APIKey
// access utility functions with util.{function}

const app = express();
const port = config.server.port;

app.use(cors());

function buildSearch(location, distance, openNow, priceRange, cuisine) {
  let search = '?term=restaurants' +
    '&sort_by=' + ((distance == 1 || util.isStreetAddress(location)) ? 'distance' : 'best_match') +
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

// Full: /restaurants/{location}/{distance}/{open_now}/{doesPickup}/{doesDelivery}?price={}&rating={}&cuisine={}&top_cuisines={}&top_prices={}&dislikes={}
// Exp param types:    string     int        bool       bool         bool          int arr  int arr   str arr    object          object        str arr
// Example: "/restaurants/santa cruz/5/true/false/false?price=2,3&rating=3,4,5&cuisine=chinese,thai&top_cuisines={"chinese":5,"sushi":2,"hotpot":1}&top_prices={"2":7,"3":3,"1":2}&dislikes=E8RJkjfdcwgtyoPMjQ_Olg,H2PYsyqsocvwlgDBmX_Adi"
app.get('/restaurants/:location/:distance/:open_now/:doesPickup/:doesDelivery', (req, res) => {
  console.log('\nRequest received at "/restaurants"');

  const yelpAPIEndpoint = 'https://api.yelp.com/v3/businesses/search' + buildSearch(req.params.location, req.params.distance, req.params.open_now, req.query.price, req.query.cuisine);

  let top_cuisines = {};
  let top_prices = {};
  if (req.query.top_cuisines) {
    top_cuisines = JSON.parse(req.query.top_cuisines);
  }
  if (req.query.top_prices) {
    top_prices = JSON.parse(req.query.top_prices);
  }

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
      if (req.query.dislikes) {
        if (req.query.dislikes.split(',').includes(restaurant.id)) return;
      }

      // Get cuisine categories lists
      const cuisineList = [];
      const cuisineCodeList = [];
      restaurant.categories.forEach(category => {
        cuisineList.push(category.title);
        cuisineCodeList.push(category.alias);
      });

      // Add restaurant to response data
      responseData.restaurants.push({
        'name': restaurant.name,
        'id': restaurant.id,
        'image_url': restaurant.image_url,
        'review_avg': restaurant.rating,
        'review_count': restaurant.review_count,
        'cuisine': cuisineList,
        'cuisineCodes': cuisineCodeList,
        'price': restaurant.price,
        'address': restaurant.location.display_address.join('\n'),
        'phone': restaurant.phone,
        'display_phone': restaurant.display_phone,
        'distance': (restaurant.distance / 1609.344) //in miles
      });
    });
    // Add number of restaurants returned to response data
    responseData['total'] = Math.min(parseInt(responseData.restaurants.length), config.results.resultsSize);

    // Add relevance of each restaurant to response data
    util.calculateRestaurantScores(responseData.restaurants, top_cuisines, top_prices);

    // Bump up restaurants with higher relevance
    util.sortRestaurantsByRelevance(responseData.restaurants);

    // Log remaining Yelp API calls
    console.log('Remaining API calls for today: ' + yelpRes.headers['ratelimit-remaining']);

    // Send response data
    res.status(200).json(responseData).end();

  }).catch((yelpErr) => {
    if (yelpErr.response && yelpErr.response.status == 429) {
      console.log('Maximum daily Yelp API call limit reached');
    }

    // Send error msg otherwise
    res.status(500).send("Error sending request to yelp.").end();
  });
});

// Full: /details/{restaurantID}
// Exp param types:  string
// Example: "/details/WavvLdfdP6g8aZTtbBQHTw"
app.get('/details/:id', (req, res) => {
  console.log('\nRequest received at "/details"');
  const yelpAPIEndpoint = 'https://api.yelp.com/v3/businesses/' + req.params.id;

  axios.get(yelpAPIEndpoint, {
    headers: {
      'Authorization' : 'Bearer ' + keys.yelp.APIKey
    }

  }).then((yelpRes) => {
    // Build response data object
    const responseData = {
      'name': yelpRes.data.name,
      'photos': yelpRes.data.photos,
      'hours': util.parseRestaurantHours(yelpRes.data.hours),
      'open_now': ((yelpRes.data.hours[0]) ? yelpRes.data.hours[0].is_open_now : 'unknown')
    };

    // Log remaining Yelp API calls
    console.log('Remaining API calls for today: ' + yelpRes.headers['ratelimit-remaining']);

    // Send response data
    res.status(200).json(responseData).end();

  }).catch((yelpErr) => {
    if (yelpErr.response && yelpErr.response.status == 429) {
      console.log('Maximum daily Yelp API call limit reached');
    }

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
