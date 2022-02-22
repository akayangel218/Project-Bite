const streetSuffixes = [
  'road', 'rd',
  'street', 'st',
  'avenue', 'ave',
  'drive', 'dr',
  'boulevard', 'blvd',
  'lane', 'ln',
  'way', 'wy',
  'route', 'rte',
  'terrace', 'terr',
];

/**
 * Checks if a location to search from is a street address.
 * @param {string} loc An address to test
 * @returns {boolean} True if location is a street address, false if it's not
 */
function isStreetAddress(loc) {
  const terms = loc.toLowerCase().replaceAll(',', '').split(' ');
  // (Does loc contain a number?) && (Does loc contain a street suffix?)
  return /\d/.test(loc) && streetSuffixes.some(s => terms.includes(s));
}

/**
 * Loops thru restaurants, comparing them to the user's likes. Then adds a new property (relevance)
 * to each restaurant, corresponding with how many bumps up it should receive in the results.
 * @param {Array<Object>} restaurants The list of restaurant objects being built to later give to the frontend
 * @param {Object} cuisine_points Object with liked cuisines as keys and frequency as values
 * @param {Object} price_points Object with liked prices as keys and frequency as values
 */
function calculateRestaurantScores(restaurants, cuisine_points, price_points) {
  for (let i = 0; i < restaurants.length; i++) {
    restaurants[i]['relevance'] = 0;
    // (Does restaurant have at least 1 cuisine code?) && (Is the restaurant's top cuisine code in cuisine_points object?)
    if ((restaurants[i].cuisineCodes.length > 0) && (Object.keys(cuisine_points).includes(restaurants[i].cuisineCodes[0]))) {
      // Add cuisine code's corresponding number of bumps to this restaurant
      restaurants[i]['relevance'] += (cuisine_points[restaurants[i].cuisineCodes[0]]);
    }
    // (Does restaurant have a price?) && (Is the restaurant's price (as a number) in price_points object?)
    if ((restaurants[i].price) && (Object.keys(price_points).includes(restaurants[i].price.length.toString()))) {
      // add price's corresponding number of bumps (halved) to this restaurant
      restaurants[i]['relevance'] += (price_points[restaurants[i].price.length.toString()] / 2);
    }
    // Round off number of bumps
    restaurants[i]['relevance'] = Math.floor(restaurants[i]['relevance']);
  }
}

/**
 * Loops thru restaurants backwards, bumping up ones with a relevance score above zero accordingly.
 * @param {Array<Object>} restaurants The list of restaurant objects being built to later give to the frontend
 */
function sortRestaurantsByRelevance(restaurants) {
  const restaurantsCopy = JSON.parse(JSON.stringify(restaurants));
  for (let i = restaurantsCopy.length - 1; i >= 0; i--) {
    // (Does restaurant have a relevance score?) && (Is the restaurant's score greater than 0?)
    if ((restaurantsCopy[i].relevance) && (restaurantsCopy[i].relevance  > 0)) {
      moveRestaurantUp(restaurants, restaurantsCopy[i].id, restaurantsCopy[i].relevance);
    }
  }
}

function moveRestaurantUp(restaurants, id, relevance) {
  // Find restaurant's current position
  const from = restaurants.findIndex((rest) => rest.id === id);
  if (from < 0) return;
  
  // Calculate restaurant's new position
  const diff = from - relevance;
  const to = (diff < 0) ? 0 : diff;

  // Remove restaurant from current position and inject into new position
  const restaurant = restaurants.splice(from, 1)[0];
  restaurants.splice(to, 0, restaurant);
}

module.exports = {
  isStreetAddress,
  calculateRestaurantScores,
  sortRestaurantsByRelevance
}