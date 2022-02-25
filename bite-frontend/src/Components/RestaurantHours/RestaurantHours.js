import './RestaurantHours.css'
import React from 'react';

const RestaurantHours = (props) => {

  const renderHours = (hoursList) => {
    return hoursList.map((dayItem, idx) => (
      <li key={idx}><b>{dayItem.day + ' '}</b>{dayItem.timeRange}</li>
    ));
  }

  return (
    <div>
      {props.hoursList === null && (<div>Loading...</div>)}
      <ul className='modal-rh'>
        {props.hoursList !== null && renderHours(props.hoursList)}
      </ul>
    </div>
  );
}

export default RestaurantHours;