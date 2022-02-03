import React, { useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import './filter.css';

// ===== Constants =====
const buttonToggleOff = 'button-item2';
const buttonToggleOn = 'button-item2-selected';
const priceChoices = [1, 2, 3, 4];
const ratingChoices = [1, 2, 3, 4];

const FilterPage = () => {

    // ===== Setting Initial Component State =====
    const [userFilters, updateFilters] = useState({
        price: [],
        rating: [],
        other: []
    });

    const [buttonStyles, updateButtonStyles] = useState({
        price: {
            0: buttonToggleOff,
            1: buttonToggleOff,
            2: buttonToggleOff,
            3: buttonToggleOff
        },
        rating: {
            0: buttonToggleOff,
            1: buttonToggleOff,
            2: buttonToggleOff,
            3: buttonToggleOff
        },
        other: {
            0: buttonToggleOff,
            1: buttonToggleOff,
            2: buttonToggleOff
        }
    });
    
    const [distance, setNewSliderVal] = useState(5);

    // ===== Functions to Update State =====
    const handleSliderChange = (event) => {
        setNewSliderVal(event.target.value);
    }

    const handleButtonClick = (buttonID, buttonCategory) => {
        const newStyle = ((buttonStyles[buttonCategory][buttonID] === buttonToggleOff) ? buttonToggleOn : buttonToggleOff);
        const buttonStylesCopy = JSON.parse(JSON.stringify(buttonStyles));

        buttonStylesCopy[buttonCategory][buttonID] = newStyle;
        updateButtonStyles(buttonStylesCopy);

        const userFiltersCopy = JSON.parse(JSON.stringify(userFilters));

        if (newStyle === buttonToggleOn) {
            userFiltersCopy[buttonCategory].push(buttonID);
        } else {
            const i = userFiltersCopy[buttonCategory].indexOf(buttonID);
            userFiltersCopy[buttonCategory].splice(i, 1);
        }
        updateFilters(userFiltersCopy);
    }

    // ===== Functions to Render HTML =====
    const priceButtons = priceChoices.map((price, idx) => (
        <div key={idx} className={buttonStyles.price[idx]} onClick={() => handleButtonClick(idx, 'price')}>
            {'$'.repeat(price)}
        </div>
    ));

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
                <p>{distance} miles</p>
            </div>

            {/* Range Slider */}
            <input
                type="range"
                min="1"
                max="15"
                value={distance}
                className='slider'
                id='myRange'
                onChange={handleSliderChange}
            />

            <div className="grid-item">
                Price
                <br></br>
                <div className='button-container'>
                    {priceButtons}
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
                    <div className={buttonStyles.other[0]} onClick = {() => handleButtonClick(0, 'other')}>
                        Currently Open
                    </div>
                    <div className={buttonStyles.other[1]} onClick = {() => handleButtonClick(1, 'other')}>
                        Does Pickup
                    </div>
                    <div className={buttonStyles.other[2]} onClick = {() => handleButtonClick(2, 'other')}>
                        Does Delivery
                    </div>
                </div>
            </div>
          </div>
        </div>
    );
}

export default FilterPage;