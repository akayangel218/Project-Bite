// Code derived from https://endertech.com/blog/using-reacts-context-api-for-global-state-management
import React from 'react';
 
export default (state, action) => {
  switch(action.type) {
    case 'SAVE_RESTAURANTS':
      return {
        location: state.location,
        restaurantList: action.payload[0],
        resultSize: action.payload[1]
      }
    case 'SAVE_LOCATION':
      return {
        location: action.payload,
        restaurantList: state.restaurantList,
        resultSize: state.resultSize
      }
    default:
      return state;
  }
}