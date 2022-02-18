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
      // Add cuisine code's corresponding number of bumps (halved) to this restaurant
      restaurants[i]['relevance'] += (cuisine_points[restaurants[i].cuisineCodes[0]] / 2);
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

module.exports = {
  isStreetAddress,
  calculateRestaurantScores,
}