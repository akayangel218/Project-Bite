const axios = require('axios');

const endpoint = 'http://localhost:8000';
const baseParams = '/restaurants/san francisco';
const defaultParams = baseParams + '/10/false/false/false';
const detailsParams = '/details/';

let testNum = 0;

// ===== Utility Functions =====
function logTestAssertion(msg) {
  console.log(colorCode('[Test ' + (++testNum) + ' assertion]: ', 'cyan') + msg);
}

function logTestFailed() {
  console.log(colorCode('[ERROR]: ', 'red') + 'Test ' + testNum + ' failed!');
  process.exit();
}

function logTestPassed() {
  console.log(colorCode('[PASS]: ', 'green') + 'Test ' + testNum + ' passed\n');
}

function endpointFailed() {
  console.log(colorCode('[ERROR]: ', 'red') + 'Endpoint failed to respond during test ' + testNum);
  process.exit();
}

function colorCode(log, color) {
  if (color === 'cyan') {
    return '\x1b[36m' + log + '\x1b[0m';
  }
  if (color === 'green') {
    return '\x1b[32m' + log + '\x1b[0m';
  }
  if (color === 'red') {
    return '\x1b[31m' + log + '\x1b[0m';
  }
  else return log;
}

// ===== Unit Tests =====
function test_distance() {
  logTestAssertion('All restaurants are within 2 miles');
  return axios.get(endpoint + baseParams + '/2/false/false/false').then((res) => {
    res.data.restaurants.forEach(restaurant => {
      if ((restaurant.distance) > 2.2) logTestFailed();
    });
    logTestPassed();
  }).catch(endpointFailed);
}

function test_price() {
  logTestAssertion('All restaurants have price points of 1 or 4');
  return axios.get(endpoint + defaultParams + '?price=1,4').then((res) => {
    res.data.restaurants.forEach(restaurant => {
      if ((restaurant.price) != '$' && (restaurant.price) != '$$$$') logTestFailed();
    });
    logTestPassed();
  }).catch(endpointFailed);
}

function test_rating() {
  logTestAssertion('All restaurants have ratings of 4 or 4.5 stars');
  return axios.get(endpoint + defaultParams + '?rating=4').then((res) => {
    res.data.restaurants.forEach(restaurant => {
      if ((restaurant.review_avg) != 4 && (restaurant.review_avg) != 4.5) logTestFailed();
    });
    logTestPassed();
  }).catch(endpointFailed);
}

function test_likes() {
  logTestAssertion('Restaurants with chinese as top cuisine should have a relevance of 3');
  return axios.get(endpoint + defaultParams + '?cuisine=chinese&top_cuisines={"chinese":3}').then((res) => {
    res.data.restaurants.forEach(restaurant => {
      if (restaurant.cuisineCodes[0]
        && restaurant.cuisineCodes[0] === 'chinese'
        && restaurant.relevance != 3) {
          logTestFailed();
        }
    });
    logTestPassed();
  }).catch(endpointFailed);
}

function test_dislikes() {
  const dislikes = ['HHtpR0RslupSQ99GIIwW5A', 'oa6ZaLdQNzZHP7--gxBh2g', 'J7_-faNq_Ag9qTOlDn81Pw'];
  logTestAssertion('No restaurants should appear with IDs: (' + dislikes.toString().replaceAll(',', ', ') + ')');
  return axios.get(endpoint + defaultParams + '?dislikes=' + dislikes.toString()).then((res) => {
    res.data.restaurants.forEach(restaurant => {
      if (dislikes.includes(restaurant.id)) logTestFailed();
    });
    logTestPassed();
  }).catch(endpointFailed);
}

async function test_sorting() {
  logTestAssertion('Chinese restaurants should appear 3 spots higher when there are 3 liked chinese restaurants');
  await axios.get(endpoint + defaultParams).then((res) => {
    const restaurantIdxs = {};
    for (let i = 0; i < res.data.restaurants.length; i++) {
      const restaurant = res.data.restaurants[i];
      if (restaurant.cuisineCodes[0] && restaurant.cuisineCodes[0] === 'chinese') {
        restaurantIdxs[restaurant.id] = i;
      }
    }

    return axios.get(endpoint + defaultParams + '?top_cuisines={"chinese":3}').then((res2) => {
      for (let i = 0; i < res2.data.restaurants.length; i++) {
        const restaurant = res2.data.restaurants[i];
        if (restaurant.cuisineCodes[0] && restaurant.cuisineCodes[0] === 'chinese') {
          if ((i != 0) && (i != restaurantIdxs[restaurant.id] - 3)) logTestFailed();
        }
      }
      logTestPassed();
    }).catch(endpointFailed);
  }).catch(endpointFailed);
}

function test_details() {
  logTestAssertion('Details endpoint should return list of images and business hours');
  return axios.get(endpoint + detailsParams + 'HHtpR0RslupSQ99GIIwW5A').then((res) => {
    if (res.data.name !== 'Marufuku Ramen') logTestFailed();
    if (res.data.photos == null) logTestFailed();
    if (res.data.hours == null) logTestFailed();
    logTestPassed();
  }).catch(endpointFailed);
}


// ===== Handler =====
async function runTests() {
  await test_distance();
  await test_price();
  await test_rating();
  await test_likes();
  await test_dislikes();
  await test_sorting();
  await test_details();
  console.log(colorCode('[SUCCESS]: ', 'green') + 'All tests passed!');
}
runTests();