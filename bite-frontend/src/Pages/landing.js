import '../App.css';
import React, { Component } from 'react';
import LandingSearch from '../Components/LandingSearch/LandingSearch';
import { getAllLikes, getAllDislikes, removeRestaurantFromLikes, removeRestaurantFromDislikes } from '../Context/LocalStorage';
import logo from '../Assets/logo_background.png';

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        {/* <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div> */}
        <div>
          <LandingSearch />
        </div>
      </div>
    );
  }
}

export default LandingPage;