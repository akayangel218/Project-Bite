import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalState';
import './LandingSearch.css'
import logo from '../../temp-logo.png'

const LandingSearch = () => {
    const [text, updateText] = useState('');
    const { saveLocation } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        if (text.length) {
            event.preventDefault();
            saveLocation(text);
            navigate('/filter');
        }
    }

    const handleChange = (event) => {
        updateText(event.target.value);
    }

    return(
        <div className='input-block'>
            <img
                src={logo}
                className='input-logo'
                alt="logo" 
            />
            <div className="input-centerText">
                Find A Place To Eat Near You
            </div>
            <div>
                <input
                    type='text'
                    className = 'input-search'
                    placeholder='  Address, Zip Code, or City'
                    value={text}
                    onChange={handleChange}
                />
                <button 
                    type='button' 
                    className = 'submit-button'
                    onClick={handleSubmit}
                >    
                    <i className='fas fa-search-location'></i>
                </button>
            </div>
        </div>
    );
}

export default LandingSearch;