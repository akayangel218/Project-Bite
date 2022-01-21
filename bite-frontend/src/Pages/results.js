import '../App.css';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

const ResultsPage = () => {
  const { restaurantList } = useContext(GlobalContext);

  const restaurantMarkup = restaurantList.map((restaurant, idx) => (
    <li key={idx} className='restaurant-list-item'>
      <h3>{restaurant.name}</h3>
    </li>
  ));

  return (
    <div className="ResultsPage">
      <h1>Results:</h1>
        <ul className='restaurant-list'>
          {restaurantMarkup}
        </ul>
    </div>
  );
}

export default ResultsPage;