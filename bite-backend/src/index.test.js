const axios = require('axios');

const endpoint = 'http://localhost:8000';
const baseParams = '/restaurants/san francisco';
const defaultParams = baseParams + '/10/false/false/false'

let testNum = 0;

// ===== Utility Functions =====
function logTestAssertion(msg) {
  console.log('[Test ' + (++testNum) + ' assertion]: ' + msg);
}

function logTestFailed() {
  console.log('[ERROR]: Test ' + testNum + ' failed!');
  process.exit();
}

function logTestPassed() {
  console.log('[PASS]: Test ' + testNum + ' passed\n');
}

function endpointFailed() {
  console.log('[ERROR]: Endpoint failed to respond during test ' + testNum);
  process.exit();
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
  return axios.get(endpoint + defaultParams + '?cuisine=chinese&top_cuisines={"chinese":6}').then((res) => {
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


// ===== Handler =====
async function runTests() {
  await test_distance();
  await test_price();
  await test_rating();
  await test_likes();
  await test_dislikes();
  console.log('[SUCCESS]: All tests passed!');
}
runTests();