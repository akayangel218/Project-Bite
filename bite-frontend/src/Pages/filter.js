//Reference: https://www.w3schools.com/css/css_grid.asp
//
//Peer Programming:
//Jackie Wong
//Marvin Xu

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';
import { getTopCuisines, getTopPrices, getDislikedIDs } from '../Context/LocalStorage';
import './filter.css';

// ===== Constants =====
const buttonToggleOff = 'button-item2';
const buttonToggleOn = 'button-item2-selected';
const priceChoices = [1, 2, 3, 4];
const ratingChoices = [1, 2, 3, 4, 5];
const cuisineChoices = [
    "American", "Chinese", "European", "Italian", "Japanese",
    "Korean", "Mediterranean", "Mexican", "Thai", "Barbeque",
    "Breakfast", "Burgers", "Pizza", "Seafood", "Sushi"
];
const otherChoices = [0, 1, 2];

const specificallyEuropeanFood = [
    'armenian',
    'austrian',
    'belgian',
    'british',
    'czechslovakian',
    'danish',
    'eastern_european',
    'french',
    'german',
    'hungarian',
    'jewish',
    'kosher',
    'portuguese',
    'spanish',
    'turkish'
];

const backendURL = 'http://localhost:8000';

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
        9: buttonToggleOff,
       10: buttonToggleOff,
       11: buttonToggleOff,
       12: buttonToggleOff,
       13: buttonToggleOff,
       14: buttonToggleOff
    },
    other: {
        0: buttonToggleOff,
        1: buttonToggleOff,
        2: buttonToggleOff
    }
};
const defaultDistance = 5;

const FilterPage = () => {
    const { location, saveRestaurants } = useContext(GlobalContext);
    const navigate = useNavigate();

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

        let userFilter;
        switch (buttonCategory) {
            case 'price':
                userFilter = priceChoices[buttonID];
                break;
            case 'rating':
                userFilter = ratingChoices[buttonID];
                break;
            case 'cuisine':
                userFilter = cuisineChoices[buttonID];
                break;
            case 'other':
                userFilter = otherChoices[buttonID];
                break;
            default:
                userFilter = 0;
        };

        const userFiltersCopy = JSON.parse(JSON.stringify(userFilters));

        if (newStyle === buttonToggleOn) {
            userFiltersCopy[buttonCategory].push(userFilter);
        } else {
            const i = userFiltersCopy[buttonCategory].indexOf(userFilter);
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

    // ===== Functions to Send API Request =====
    const parseCuisines = () => {
        return userFilters.cuisine.toString().toLowerCase()
            .replace('american', 'newamerican,tradamerican')
            .replace('barbeque', 'bbq')
            .replace('breakfast', 'breakfast_brunch')
            .replace('burgers', 'hotdogs')
            .replace('chinese', 'chinese,asianfusion')
            .replace('european', specificallyEuropeanFood.toString())
            .replace('mediterranean', 'mediterranean,greek');
    }

    const buildSearch = () => {
        let search = '/restaurants' +
            '/' + location +
            '/' + distance +
            '/' + (userFilters.other.includes(0)) + //require open_now
            '/' + (userFilters.other.includes(1)) + //require doesPickup
            '/' + (userFilters.other.includes(2)) + //require doesDelivery
            '?';
        
        if (userFilters.price.length !== 0) {
            search += 'price=' + userFilters.price.toString() + '&';
        }
        if (userFilters.rating.length !== 0) {
            search += 'rating=' + userFilters.rating.toString() + '&';
        }
        if (userFilters.cuisine.length !== 0) {
            search += 'cuisine=' + parseCuisines() + '&';
        }
        if (Object.keys(getTopCuisines()).length !== 0) {
            search += 'top_cuisines=' + JSON.stringify(getTopCuisines()) + '&';
        }
        if (Object.keys(getTopPrices()).length !== 0) {
            search += 'top_prices=' + JSON.stringify(getTopPrices()) + '&';
        }
        if (getDislikedIDs().length !== 0) {
            search += 'dislikes=' + getDislikedIDs().toString();
        }

        return search;
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const searchString = backendURL + buildSearch();
        axios.get(searchString).then((res) => {
            saveRestaurants(res.data.restaurants, res.data.total);
            navigate('/primary_result', { replace: false });

        }).catch((err) => {
            console.log('Error with backend API: ' + err.message);
        });
    }

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
            <div className='apply-button' onClick={handleSubmit}>Apply</div>
          </div>
          <br></br><br></br>
        </div>
    );
}

export default FilterPage;