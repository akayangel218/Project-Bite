import './StarRating.css'
import React from 'react';
import stars00 from '../../Assets/Stars/regular_0.png';
import stars10 from '../../Assets/Stars/regular_1.png';
import stars15 from '../../Assets/Stars/regular_1_half.png';
import stars20 from '../../Assets/Stars/regular_2.png';
import stars25 from '../../Assets/Stars/regular_2_half.png';
import stars30 from '../../Assets/Stars/regular_3.png';
import stars35 from '../../Assets/Stars/regular_3_half.png';
import stars40 from '../../Assets/Stars/regular_4.png';
import stars45 from '../../Assets/Stars/regular_4_half.png';
import stars50 from '../../Assets/Stars/regular_5.png';

const StarRating = (props) => {

  const getStars = (rating) => {
    let stars = stars00;
    switch (rating) {
      case 5:
        stars = stars50;
        break;
      case 4.5:
        stars = stars45;
        break;
      case 4:
        stars = stars40;
        break;
      case 3.5:
        stars = stars35;
        break;
      case 3:
        stars = stars30;
        break;
      case 2.5:
        stars = stars25;
        break;
      case 2:
        stars = stars20;
        break;
      case 1.5:
        stars = stars15;
        break;
      case 1:
        stars = stars10;
        break;
    }

    return (
      <img src={stars} alt={rating + ' stars'} className="StarRating-img"/>
    )
  }

  return (
    <div className="StarRating">
      {getStars(props.rating)}
      {' (' + props.total + ')'}
    </div>
  );
}

export default StarRating;