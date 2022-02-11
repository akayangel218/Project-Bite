import '../App.css';
import './results.css';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { addRestaurantToLikes, addRestaurantToDislikes, removeRestaurantFromLikes, removeRestaurantFromDislikes } from '../Context/LocalStorage';
import StarRating from '../Components/StarRating/StarRating';

const ResultsPage = () => {
  const { restaurantList } = useContext(GlobalContext);

  const restaurantMarkup = restaurantList.map((restaurant, idx) => {
    if (idx === 0) return;
    return (
      <div key={idx} className='card'>
        <img src={restaurant.image_url} alt={restaurant.name + ' Yelp image'} className='img'/>
        <div className='container'>
          <span className='name'>
            {restaurant.name}
          </span>
          <div className='stars'>
            <StarRating rating={restaurant.review_avg} total={restaurant.review_count} isOnPrimaryResultPage={false} />
          </div>
          <div className='desc'>
            {restaurant.cuisine.toString().replaceAll(',', ', ')}
          </div>
          <div className='price'>
            {restaurant.price}
          </div>
        </div>
      </div>
    )
  });

  return (
    <div className="ResultsPage">
        <ul className='results'>
          {restaurantMarkup}
        </ul>
    </div>
  );
}

export default ResultsPage;