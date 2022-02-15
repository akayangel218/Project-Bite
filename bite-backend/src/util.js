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
  // (does loc contain a number?) && (does loc contain a street suffix?)
  return /\d/.test(loc) && streetSuffixes.some(s => terms.includes(s));
}

module.exports = {
  isStreetAddress
}