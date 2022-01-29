import React, { Component } from 'react';
import './filter.css';

class FilterPage extends Component {
    render() {
      return (
        <div className="FilterPage">
          <br></br>
          {/* Grid */}
          <div class="grid-container">
            <div class="grid-header">
                <p>Filters</p>
                <p>[reset]</p>
            </div>
            <div class="grid-distance">
                <p>Distance</p>
                <p>[value]</p>
            </div>
            {/* Range Slider */}
            <input type="range" min="1" max="30" defaultvalue="1" className='slider' id='myRange' />
            <div class="grid-item">
                Price
                <br></br>
                <div className='button-container'>
                    <div className='button-item'>$</div>
                    <div className='button-item'>$$</div>
                    <div className='button-item'>$$$</div>
                    <div className='button-item'>$$$$</div>
                </div>
            </div>
            <div class="grid-item">
                Rating
                <br></br>
                <div className='button-container'>
                    <div className='button-item'>★</div>
                    <div className='button-item'>★★</div>
                    <div className='button-item'>★★★</div>
                    <div className='button-item'>★★★★</div>
                </div>
            </div>
            <div class="grid-item">
                Cuisine
                <br></br>
                <div className='button-container'>
                    <div className='button-item2'>American</div>
                    <div className='button-item2'>Barbecue</div>
                    <div className='button-item2'>Chinese</div>
                    <div className='button-item2'>Hamburger</div>
                    <div className='button-item2'>Italian</div>
                    <div className='button-item2'>Japanese</div>
                    <div className='button-item2'>Pizza</div>
                    <div className='button-item2'>Mexican</div>
                    <div className='button-item2'>Sushi</div>
                    <div className='button-item2'>ANY</div>
                </div>
            </div>
            <div className='grid-item'>
                <div class="grid-subitem">[Open] [Pickup] [Delivery]</div>
            </div>
            <div className='grid-item'>
                <div class="grid-subitem">[APPLY FILTERS]</div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default FilterPage;