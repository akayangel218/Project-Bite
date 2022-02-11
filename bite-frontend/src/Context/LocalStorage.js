// This file holds all the functions that handle the user's liked and disliked restaurant lists

// ===== Constants =====
const likes_keyname = 'likes';
const dislikes_keyname = 'dislikes';

// ===== Functions to add & remove likes & dislikes (for modifying) =====
function addRestaurantToLikes(restaurant) {
  const allLikes = getAllLikes();
  allLikes.push(restaurant);
  localStorage.setItem(likes_keyname, JSON.stringify(allLikes));
};

function removeRestaurantFromLikes(restaurantID) {
  const newAllLikes = getAllLikes().filter(restaurant => restaurant.id != restaurantID);
  localStorage.setItem(likes_keyname, JSON.stringify(newAllLikes));
};

function addRestaurantToDislikes(restaurant) {
  const allDislikes = getAllDislikes();
  allDislikes.push(restaurant);
  localStorage.setItem(dislikes_keyname, JSON.stringify(allDislikes));
};

function removeRestaurantFromDislikes(restaurantID) {
  const newAllDislikes = getAllDislikes().filter(restaurant => restaurant.id != restaurantID);
  localStorage.setItem(dislikes_keyname, JSON.stringify(newAllDislikes));
};

// ===== Functions to get all likes & dislikes (for listing / displaying) =====
function getAllLikes() {
  const allLikesUnparsed = localStorage.getItem(likes_keyname);
  if (allLikesUnparsed == null) return [];
  else return JSON.parse(allLikesUnparsed);
};

function getAllDislikes() {
  const allDislikesUnparsed = localStorage.getItem(dislikes_keyname);
  if (allDislikesUnparsed == null) return [];
  else return JSON.parse(allDislikesUnparsed);
};

// ===== Functions to extract & format info from likes & dislikes (for sending to backend) =====
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

  const cuisineList = [];
  for (const cuisineCode in cuisines) {
    cuisineList.push(cuisineCode + ':' + cuisines[cuisineCode]);
  }

  return cuisineList;
};

function getTopPrices() {
  const prices = {};
  getAllLikes().forEach(restaurant => {
    const price = (restaurant.price).length;
    if (prices[price] == null) {
      prices[price] = 1;
    } else {
      prices[price] += 1;
    }
  });

  const priceList = [];
  for (const priceKey in prices) {
    priceList.push(priceKey + ':' + prices[priceKey]);
  }

  return priceList;
};

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