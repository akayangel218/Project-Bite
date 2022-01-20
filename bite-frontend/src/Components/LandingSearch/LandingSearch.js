import React, { Component } from 'react';
import './LandingSearch.css'
import logo from '../../temp-logo.svg'

class LandingSearch extends Component {
    state = {
        locationInput: ''
    }

    updateSearchVal(loc) {
        this.setState({
            locationInput: loc.target.value
        });
    }

    sendRequest = () => {
        alert(this.state.locationInput)
    }

    render() {
        return(
            // <nav className='NavbarItems'>
            //     <h1 className='navbar-logo'>Bite<i className='fas fa-hamburger'></i></h1>
            //     <div className='menu-icon' onClick={this.handleClick}>
            //         <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            //     </div>
            //     <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
            //         {MenuItems.map((item, index) => {
            //             return(
            //                 <li key={index}>
            //                     <a className={item.cName} href={item.url}>
            //                         {item.title}
            //                     </a>
            //                 </li>
            //             )
            //         })}
            //     </ul>
            //     <Button>Sign up</Button>
            // </nav>
            <div className='input-block'>
                <img
                    src={logo}
                    className='input-logo'
                    alt="logo" 
                />
                <div class="input-centerText">
                    Find A Place To Eat Near You
                </div>
                <div>
                    <input
                        type='text'
                        className = 'input-search'
                        placeholder='  Address, Zip Code, or City'
                        value={this.state.locationInput}
                        onChange={loc => this.updateSearchVal(loc)}
                    />
                    <button 
                        type='button' 
                        className = 'submit-button'
                        onClick={this.sendRequest}
                    >    
                        <i className='fas fa-search-location'></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default LandingSearch