// Code derived from https://endertech.com/blog/using-reacts-context-api-for-global-state-management
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  location: '',
  restaurantList: [],
  resultSize: 0
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state

  function saveRestaurants(restaurants, total) {
    dispatch({
      type: 'SAVE_RESTAURANTS',
      payload: [restaurants, total]
    });
  }

  function saveLocation(location) {
    dispatch({
      type: 'SAVE_LOCATION',
      payload: location
    });
  }

  return(
    <GlobalContext.Provider value = {{
      location: state.location,
      restaurantList: state.restaurantList,
      resultSize: state.resultSize,
      saveRestaurants,
      saveLocation
    }}> 
      {children} 
    </GlobalContext.Provider>
  )
}