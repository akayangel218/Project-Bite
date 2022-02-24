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

const daysOfWeek = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
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

/**
 * Formats a restaurant's open hours into a readable string list of hours.
 * @param {Array<Object} hours List of days' restaurant opening schedule as given by yelp
 * @returns A list of formatted strings to display each day's open times
 */
function parseRestaurantHours(hours) {
  // If restaurant has no known hours posted, return 'unknown'
  if (!hours[0] || !hours[0].open[0]) {
    return 'unknown';
  }

  // Loop thru days restaurant is open, adding parsed data to return object
  const hrsList = [];
  hours[0].open.forEach(dayObj => {
    const dayHours = {
      'day': daysOfWeek[dayObj.day],
      'timeRange': prepareRestaurantHours(dayObj.start, dayObj.end, dayObj.is_overnight)
    };
    hrsList.push(dayHours);
  });
  return hrsList;
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

function prepareRestaurantHours(start, end, overnight) {
  // Separate hours from minutes
  const startHr = parseInt(start.slice(0, 2));
  const startMin = parseInt(start.slice(2, 4));
  const endHr = parseInt(end.slice(0, 2));
  const endMin = parseInt(end.slice(2, 4));

  // Calculate whether hours are AM or PM
  const startMeridiem = (startHr >= 12) ? 'PM' : 'AM';
  const endMeridiem = (endHr >= 12) ? 'PM' : 'AM';

  // Convert to 12 hr time
  const start12Hr = ((startHr + 11) % 12 + 1);
  const end12Hr = ((endHr + 11) % 12 + 1);

  // Combine parsed hours & minutes
  const startFull = start12Hr + ':' + ((startMin.toString().length < 2) ? '0' : '') + startMin + ' ' + startMeridiem;
  const endFull = end12Hr + ':' + ((endMin.toString().length < 2) ? '0' : '') + endMin + ' ' + endMeridiem;

  // Put it all together
  return startFull + ' - ' + endFull + ((overnight) ? ' (Next day)' : '');
}

module.exports = {
  isStreetAddress,
  calculateRestaurantScores,
  sortRestaurantsByRelevance,
  parseRestaurantHours
}