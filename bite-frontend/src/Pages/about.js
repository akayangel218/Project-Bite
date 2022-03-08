import './about.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AboutUs  extends Component { 
    render() {
        return (
            <>
                <div className='title'> About Us </div>
                <div className='textbox'> 
                    <span className='text'>
                        Thank you for visiting. Bite was created by 5 undergrad students at UC Santa Cruz as a class project. Over the past 10 weeks Bite was developed. Our team used SCRUM and Agile practices to collaborate on Bite. We have used the Yelp API to provide users with a curated result with their best restaurant match.
                    </span>
                    <br></br>
                    <br></br>
                    <span className='text'>
                        With Bite the guesswork is over; we help you in finding the best restaurant. Using your location and preferences, we will provide you with a match. If you don't like your original match, we share more results for you to find the best place to eat. Your likes matter, we use all your likes and dislikes to provide you with the best-ranked results. Your dashboard displays all information regarding your preferences.
                    </span>
                    <br></br>
                    <br></br>
                    <span className='text'>
                        Interested in more details, check out our GitHub page for further details on how we built Bite. Our GitHub shares everything from Sprint Planning to Source Code. The work was split into 4 sprints that brought us closer to our final product.
                    </span>
                </div>
            </>
        );
    }
}

export default AboutUs;