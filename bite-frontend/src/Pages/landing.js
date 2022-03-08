import '../App.css';
import React, { Component } from 'react';
import LandingSearch from '../Components/LandingSearch/LandingSearch'

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <div>
          <LandingSearch />
        </div>
      </div>
    );
  }
}

export default LandingPage;