import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './LandingSearch.css'
import logo from '../../temp-logo.svg'

class LandingSearch extends Component {
    state = {
        locationInput: '',
        redirect: null
    }

    updateSearchVal(loc) {
        this.setState({
            locationInput: loc.target.value
        });
    }

    sendRequest = () => {
        // useSearchLocation(this.state.locationInput)
        this.setState({
            redirect: '/results'
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
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