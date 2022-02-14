import './primary_result.css';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';
import { addRestaurantToLikes, addRestaurantToDislikes, removeRestaurantFromLikes, removeRestaurantFromDislikes, getAllLikes } from '../Context/LocalStorage';
import StarRating from '../Components/StarRating/StarRating';

const PrimaryResultPage = () => {
    const navigate = useNavigate();

    const { restaurantList } = useContext(GlobalContext);
    const restaurant = restaurantList[0];

    const handleSeeMore = () => {
        navigate('/results', { replace: false });
    }

    if (restaurant == null) {
        return (
            <div>
                No restaurants loaded
            </div>
        )
    }

    const matchingCuisines = restaurant.cuisine.map((cuisine, idx) => {
        if (idx > 2) return;
        return (
            <span className='pr-filter-match' key={idx}>
                {cuisine}
            </span>
        );
    });

    return (
        <div className="PrimaryResultPage">
            <div className='pr-card-holder'>
                <img src={restaurant.image_url} alt={restaurant.name + ' Yelp image'} className='pr-img'/>
                <div className='pr-card-content'>
                    <div className='pr-title'>
                        {'Best Bite for you: ' + restaurant.name}
                    </div>
                    <div className='pr-phone'>
                        {restaurant.display_phone}
                    </div>
                    <div className='pr-star'>
                        <StarRating rating={restaurant.review_avg} total={restaurant.review_count} isOnPrimaryResultPage={true} />
                    </div>
                    <div className='pr-filter-matches'>
                        <span className='pr-price'>
                            {restaurant.price}
                        </span>
                    </div>
                    <div className='pr-filter-matches'>
                        {matchingCuisines}
                    </div>
                </div>
            </div>
            <div className='gird-apply'>
                <button className='pr-more-results' onClick={handleSeeMore}>
                    Not interested? See more matches
                 </button>
            </div>
        </div>
    );
}

export default PrimaryResultPage;