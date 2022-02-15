const axios = require('axios');

const endpoint = 'http://localhost:8000';
const baseParams = '/restaurants/san francisco';

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
  console.log('[PASS]: Test ' + testNum + ' passed');
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


// ===== Handler =====
async function runTests() {
  await test_distance();
  console.log('[SUCCESS]: All tests passed!');
}
runTests();