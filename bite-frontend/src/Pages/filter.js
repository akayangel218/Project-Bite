import React, { useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import './filter.css';

// ===== Constants =====
const buttonToggleOff = 'button-item2';
const buttonToggleOn = 'button-item2-selected';
const priceChoices = [1, 2, 3, 4];
const ratingChoices = [1, 2, 3, 4, 5];
const cuisineChoices = ["American", "Barbecue", "Chinese", "Hamburger", "Italian", 
                        "Japanese", "Pizza", "Mexican", "Sushi",  "ANY"];

// ===== Default State =====
const defaultUserFilters = {
    price: [],
    rating: [],
    cuisine: [],
    other: []
};
const defaultButtonStyles = {
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
        3: buttonToggleOff,
        4: buttonToggleOff
    },
    cuisine: {
        0: buttonToggleOff,
        1: buttonToggleOff,
        2: buttonToggleOff,
        3: buttonToggleOff,
        4: buttonToggleOff,
        5: buttonToggleOff,
        6: buttonToggleOff,
        7: buttonToggleOff,
        8: buttonToggleOff,
        9: buttonToggleOff
    },
    other: {
        0: buttonToggleOff,
        1: buttonToggleOff,
        2: buttonToggleOff
    }
};
const defaultDistance = 5;

const FilterPage = () => {

    // ===== Setting Initial Component State =====
    const [userFilters, updateFilters] = useState(defaultUserFilters);

    const [buttonStyles, updateButtonStyles] = useState(defaultButtonStyles);
    
    const [distance, setNewSliderVal] = useState(defaultDistance);

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

    const resetAllState = () => {
        updateFilters(defaultUserFilters);
        updateButtonStyles(defaultButtonStyles);
        setNewSliderVal(defaultDistance);
    }

    // ===== Functions to Render HTML =====
    const priceButtons = priceChoices.map((price, idx) => (
        <div key={idx} className={buttonStyles.price[idx]} onClick={() => handleButtonClick(idx, 'price')}>
            {'$'.repeat(price)}
        </div>
    ));

    const ratingButtons = ratingChoices.map((rating, idx) => (
        <div key={idx} className={buttonStyles.rating[idx]} onClick={() => handleButtonClick(idx, 'rating')}>
            {'★'.repeat(rating)}
        </div>
    ));

    const cuisineButtons = cuisineChoices.map((cuisine, idx) => (
        <div key={idx} className={buttonStyles.cuisine[idx]} onClick={() => handleButtonClick(idx, 'cuisine')}>
            {cuisine}
        </div>
    ));

    return (
        <div className="FilterPage">
          <br></br>
          {/* Grid */}
          <div className="grid-container">
            <div className="grid-header">
                <div className='header'>Filters</div>
                <div className="button-reset" onClick = {() => resetAllState()}>
                    Reset
                </div>
            </div>
            <div className="grid-distance">
                Distance
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
                    {ratingButtons}
                </div>
            </div>
            <div className="grid-item">
                Cuisine
                <br></br>
                <div className='button-container'>
                    {cuisineButtons}
                    {/* <div className='button-item2'>American</div>
                    <div className='button-item2'>Barbecue</div>
                    <div className='button-item2'>Chinese</div>
                    <div className='button-item2'>Hamburger</div>
                    <div className='button-item2'>Italian</div>
                    <div className='button-item2'>Japanese</div>
                    <div className='button-item2'>Pizza</div>
                    <div className='button-item2'>Mexican</div>
                    <div className='button-item2'>Sushi</div>
                    <div className='button-item2'>ANY</div> */}
                </div>
            </div>
            <div className='divider'></div>
            <div className="grid-item-takeout">
                <div className='button-container2'>
                    <div className={buttonStyles.other[0]} onClick = {() => handleButtonClick(0, 'other')}>
                        Currently<br></br>Open
                    </div>
                    <div className={buttonStyles.other[1]} onClick = {() => handleButtonClick(1, 'other')}>
                        Does<br></br>Pickup
                    </div>
                    <div className={buttonStyles.other[2]} onClick = {() => handleButtonClick(2, 'other')}>
                        Does<br></br>Delivery
                    </div>
                </div>
            </div>
            <div className='gird-apply'>
                <div className='apply-button'>Apply</div>
            </div>
          </div>
          <br></br><br></br>
        </div>
    );
}

export default FilterPage;