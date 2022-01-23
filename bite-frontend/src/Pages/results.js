import '../App.css';
import './results.css';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import StarRating from '../Components/StarRating/StarRating';

const ResultsPage = () => {
  const { restaurantList } = useContext(GlobalContext);

  const restaurantMarkup = restaurantList.map((restaurant, idx) => (
    <div key={idx} className='card'>
      <img src={restaurant.image_url} alt={restaurant.name + ' Yelp image'} className='img'/>
      <div className='container'>
        <div className='name'>
          {restaurant.name}
        </div>
        <div className='desc'>
          {restaurant.cuisine}
        </div>
        <div className='price'>
          {restaurant.price}
        </div>
        <div className='stars'>
          <StarRating rating={restaurant.review_avg} total={restaurant.review_count} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="ResultsPage">
        <ul className='results'>
          {restaurantMarkup}
        </ul>
    </div>
  );
}

export default ResultsPage;