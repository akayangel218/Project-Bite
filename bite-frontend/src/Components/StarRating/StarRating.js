import './StarRating.css'
import React from 'react';

const StarRating = (props) => {

  const fullStars = Math.floor(props.rating);
  const hasHalfStar = props.rating.toString().includes('.');

  const getStars = (full, half) => {
    let starsLeft = 5;
    let starComponent = [];
    for (let star = 0; star < full; star++) {
      starComponent.push(
        <i className='fas fa-star apply-color'></i>
      );
      starsLeft--;
    }
    if (half) {
      starComponent.push(
        <i className='fas fa-star-half-alt apply-color'></i>
      );
      starsLeft--;
    }
    for (let star = 0; star < starsLeft; star++) {
      starComponent.push(
        <i className='far fa-star apply-color'></i>
      );
    }
    return starComponent;
  }

  return (
    <div className="StarRating">
      {getStars(fullStars, hasHalfStar)}
      {' (' + props.total + ')'}
    </div>
  );
}

export default StarRating;