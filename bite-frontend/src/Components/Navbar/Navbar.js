import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItems } from "./MenuItems"
import { GlobalContext } from '../../Context/GlobalState';
import { Button } from '../Button/Button';
import './Navbar.css'

const Navbar = () => {
    const [clicked, setClicked] = useState(false)

    const { location, saveLocation } = useContext(GlobalContext);
    const [text, updateText] = useState(location.toString());
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

    const handleClick = () => {
        setClicked(!clicked)
    }

    return(
            <nav className = 'NavbarItems' >
                <a className='navbar-logo' href='/'>Bite <i className='fas fa-hamburger'></i></a>

                <div className='menu-icon' onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <div>
                    <input
                        type='text'
                        className='nav-search-bar'
                        placeholder='  Address, Zip Code, or City'
                        value={text}
                        onChange={handleChange} />
                    <button
                        type='button'
                        className='nav-submit-button'
                        onClick={handleSubmit}
                    >
                        <i className='fas fa-search-location'></i>
                    </button>
                </div>

                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                
                <a className='dashboard-button' href='/dashboard'>Dashboard</a>
            </nav>
        )
}

export default Navbar;