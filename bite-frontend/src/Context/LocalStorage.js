// This file holds all the functions that handle the user's liked and disliked restaurant lists

// ===== Functions to add & remove likes & dislikes (for modifying) =====
function addRestaurantToLikes(restaurant) {};

function removeRestaurantFromLikes(restaurantID) {};

function addRestaurantToDislikes(restaurant) {};

function removeRestaurantFromDislikes(restaurant) {};

// ===== Functions to get all likes & dislikes (for listing / displaying) =====
function getAllLikes() {};

function getAllDislikes() {};

// ===== Functions to extract & format info from likes & dislikes (for sending to backend) =====
function getTopCuisines() {};

function getTopPrices() {};

function getDislikedIDs() {};

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