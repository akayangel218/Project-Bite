import './about.css'
import React, { Component } from 'react';

class AboutUs  extends Component { 
    render() {
        return (
            <>
                <div className='title'> About Us </div>
                <div className='textbox'> 
                    <span className='text'>
                        Thank you for visiting. Bite was created by 5 undergrad students at UC Santa Cruz over the course of 10 weeks as a class project. Our team used SCRUM and Agile practices to collaborate on Bite. We're utilizing Yelp's Fusion API to provide users with a custom curated list of restaurants with the intent of matching them with their perfect location.
                    </span>
                    <br></br>
                    <br></br>
                    <span className='text'>
                        With Bite the guesswork is over; we help you in finding the best restaurant. Using your location and preferences, we will provide you with a match. If you don't like your original match, we share more results for you to find the best place to eat. Your likes matter, as we use all your likes and dislikes to provide you with the best-ranked results. And your dashboard shows you lists of all your liked and disliked restaurants.
                    </span>
                    <br></br>
                    <br></br>
                    <span className='text'>
                        Interested in learning more? Check out our <a href="https://github.com/akayangel218/Project-Bite" target="_blank" rel="noreferrer">Github</a> page for the complete source code and Agile documentation. Our GitHub hosts everything from Sprint Planning to Scrum boards. We split our work into 4 sprints that steered us clearly towards our final product.
                    </span>
                </div>
            </>
        );
    }
}

export default AboutUs;