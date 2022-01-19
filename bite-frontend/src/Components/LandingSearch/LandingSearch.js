import React, { Component } from 'react';
import './LandingSearch.css'
import logo from '../../logo_bite.png'

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
            <div>
                <img 
                    className = 'input-logo'
                    src={logo} className="App-logo" alt="logo" 
                    
                />
                <div class="input-centerText">
                    Find A Place To Eat Near You
                </div>
                <div>
                     <input
                    type='text'
                    className = 'input-search'
                    size='30'
                    placeholder='Address, zip code, or city'
                    value={this.state.locationInput}
                    onChange={loc => this.updateSearchVal(loc)}
                />
                <button 
                    type='button' 
                    className = 'input-button'
                    onClick={this.sendRequest}
                >    
                    <i className='fas fa-search-location'></i>
                </button>
                </div>
                <div className='input-spacer'/>
            </div>
        )
    }
}

export default LandingSearch