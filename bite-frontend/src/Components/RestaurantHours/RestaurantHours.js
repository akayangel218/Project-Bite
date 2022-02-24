import './RestaurantHours.css'
import React, { useState } from 'react';
import axios from 'axios';

const backendURL = 'http://localhost:8000';

const RestaurantHours = (props) => {
  const [moreRestaurantDetails, updateRestaurantDetails] = useState(null);
  const ID = props.restaurantID;

  const renderHours = (hours) => {
    return hours.map((dayItem, idx) => (
      <li key={idx}><b>{dayItem.day + ' '}</b>{dayItem.timeRange}</li>
    ));
  }

  const fetchHours = () => {
    axios.get(backendURL + '/details/' + ID).then((res) => {
      updateRestaurantDetails(renderHours(res.data.hours));

    }).catch((err) => {
        console.log('Error with backend API: ' + err.message);
    });
  }

  setTimeout(() => {
    fetchHours();
  }, 3000);

  return (
    <div>
      {moreRestaurantDetails === null &&
        /* Loading spinner courtesy of https://loading.io/css/ */
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      }
      <ul className='modal-rh'>
        {moreRestaurantDetails}
      </ul>
    </div>
  );
}

export default RestaurantHours;