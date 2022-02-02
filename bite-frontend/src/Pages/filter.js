import React, { useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import './filter.css';


var slider_value = '5';

//temporary
const FilterPage = () => {
    const [buttonStyle, setStyle] = useState("button-item2");

    function handleClick() {
        alert("CLICKED");
        setStyle("button-item2-hover");
    }

    return (
        <div className="FilterPage">
          <br></br>
          {/* Grid */}
          <div className="grid-container">
            <div className="grid-header">
                <p>Filters</p>
                <p>[reset]</p>
            </div>
            <div className="grid-distance">
                <p>Distance</p>
                <p>{slider_value}</p>
            </div>
            {/* Range Slider */}
            <input type="range" min="1" max="30" defaultValue="1" className='slider' id='myRange' />
            <div className="grid-item">
                Price
                <br></br>
                <div className='button-container'>
                    <div className='button-item'>$</div>
                    <div className='button-item'>$$</div>
                    <div className='button-item'>$$$</div>
                    <div className='button-item'>$$$$</div>
                </div>
            </div>
            <div className="grid-item">
                Rating
                <br></br>
                <div className='button-container'>
                    <div className='button-item'>★</div>
                    <div className='button-item'>★★</div>
                    <div className='button-item'>★★★</div>
                    <div className='button-item'>★★★★</div>
                </div>
            </div>
            <div className="grid-item">
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
            <div className="grid-item-takeout">
                <br></br>
                <div className='button-container'>
                    <div className={buttonStyle} onClick = {handleClick}  
                        >Open</div>
                    <div className={buttonStyle} >Pickup</div>
                    <div className='button-item2' >Delivery</div> 
                </div>
            </div>
          </div>
        </div>
    );
}

export default FilterPage;