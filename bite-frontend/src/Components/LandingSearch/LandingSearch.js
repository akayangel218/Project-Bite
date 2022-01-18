import React, { Component } from 'react';
import { Button } from '../Button';
import './LandingSearch.css'

class Navbar extends Component {
    state = {
        clicked: false
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
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
                <input type='text' size="30" placeholder='Address, zip code, or city' />
                <button type='button'><i className='fas fa-search-location'></i></button>
                <div className='input-spacer'/>
            </div>
        )
    }
}

export default Navbar