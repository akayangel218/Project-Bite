// This file holds all the functions that handle the user's liked and disliked restaurant lists

// ===== Constants =====
const likes_keyname = 'likes';
const dislikes_keyname = 'dislikes';

// ===== Functions to add & remove likes & dislikes (for modifying) =====
/**
 * Adds restaurant to local liked list.
 * @param {Object} restaurant Object exactly like is provided by backend
 */
function addRestaurantToLikes(restaurant) {
  const allLikes = getAllLikes();
  allLikes.push(restaurant);
  localStorage.setItem(likes_keyname, JSON.stringify(allLikes));
};

/**
 * Removes restaurant from local liked list.
 * @param {string} restaurantID ID from restaurant.id
 */
function removeRestaurantFromLikes(restaurantID) {
  const newAllLikes = getAllLikes().filter(restaurant => restaurant.id != restaurantID);
  localStorage.setItem(likes_keyname, JSON.stringify(newAllLikes));
};

/**
 * Adds restaurant to local disliked list.
 * @param {Object} restaurant Object exactly like is provided by backend
 */
function addRestaurantToDislikes(restaurant) {
  const allDislikes = getAllDislikes();
  allDislikes.push(restaurant);
  localStorage.setItem(dislikes_keyname, JSON.stringify(allDislikes));
};

/**
 * Removes restaurant from local disliked list.
 * @param {string} restaurantID ID from restaurant.id
 */
function removeRestaurantFromDislikes(restaurantID) {
  const newAllDislikes = getAllDislikes().filter(restaurant => restaurant.id != restaurantID);
  localStorage.setItem(dislikes_keyname, JSON.stringify(newAllDislikes));
};

// ===== Functions to get all likes & dislikes (for listing / displaying) =====
/**
 * Provides all liked restaurants.
 * @returns List holding all liked restaurants as objects
 */
function getAllLikes() {
  const allLikesUnparsed = localStorage.getItem(likes_keyname);
  if (allLikesUnparsed == null) return [];
  else return JSON.parse(allLikesUnparsed);
};

/**
 * Provides all disliked restaurants.
 * @returns List holding all disliked restaurants as objects
 */
function getAllDislikes() {
  const allDislikesUnparsed = localStorage.getItem(dislikes_keyname);
  if (allDislikesUnparsed == null) return [];
  else return JSON.parse(allDislikesUnparsed);
};

// ===== Functions to extract & format info from likes & dislikes (for sending to backend) =====
/**
 * Returns the cuisines of the locally stored liked restaurants list, as well as their frequencies.
 * @returns Object containing keys as top cuisines and values as number of appearances in favorites
 */
function getTopCuisines() {
  const cuisines = {};
  getAllLikes().forEach(restaurant => {
    const cuisine = restaurant.cuisineCodes[0];
    if (cuisine != null) {
      if (cuisines[cuisine] == null) {
        cuisines[cuisine] = 1;
      } else {
        cuisines[cuisine] += 1;
      }
    }
  });

  return cuisines;
};

/**
 * Returns the price points of the locally stored liked restaurants list, as well as their frequencies.
 * @returns Object containing keys as top price points and values as number of appearances in favorites
 */
function getTopPrices() {
  const prices = {};
  getAllLikes().forEach(restaurant => {
    if (!restaurant.price) return;
    
    const price = (restaurant.price).length;
    if (prices[price] == null) {
      prices[price] = 1;
    } else {
      prices[price] += 1;
    }
  });

  return prices;
};

/**
 * Returns all disliked restaurants' IDs.
 * @returns List of IDs (strings) of every restaurant in locally stored disliked restaurants list
 */
function getDislikedIDs() {
  const dislikedIDs = [];
  getAllDislikes().forEach(restaurant => {
    dislikedIDs.push(restaurant.id);
  });
  
  return dislikedIDs;
};

// ===== Exports =====
module.exports = {
  addRestaurantToLikes,
  removeRestaurantFromLikes,
  addRestaurantToDislikes,
  removeRestaurantFromDislikes,
  getAllLikes,
  getAllDislikes,
  getTopCuisines,
  getTopPrices,
  getDislikedIDs
};