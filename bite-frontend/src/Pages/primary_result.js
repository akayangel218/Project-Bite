import './primary_result.css';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';
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

    return (
        <div className="PrimaryResultPage">
            <div className='pr-card-holder'>
                <img src={restaurant.image_url} alt={restaurant.name + ' Yelp image'} className='pr-img'/>
                <div className='pr-card-content'>
                    <div className='pr-title'>
                        {'Best Bite for you: ' + restaurant.name}
                    </div>
                    <StarRating rating={restaurant.review_avg} total={restaurant.review_count} isOnPrimaryResultPage={true} />
                    <div className='pr-price'>
                        {restaurant.price}
                    </div>
                    <div className='pr-filter-matches'>
                        <div className='pr-filter-match'>
                            Filter match 1
                        </div>
                        <div className='pr-filter-match'>
                            Filter match 2
                        </div>
                        <div className='pr-filter-match'>
                            Filter match 3
                        </div>
                    </div>
                    
                    <button className='pr-more-results' onClick={handleSeeMore}>
                        Not interested? See more matches
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PrimaryResultPage;