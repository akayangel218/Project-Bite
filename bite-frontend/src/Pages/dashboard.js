//Reference: https://www.better.dev/displaying-lists-in-react-jsx
//
//Peer Programming:
//Jackie Wong
//Marvin Xu

import './dashboard.css';
import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';
import { addRestaurantToLikes, addRestaurantToDislikes, removeRestaurantFromLikes, removeRestaurantFromDislikes, getAllLikes, getAllDislikes } from '../Context/LocalStorage';
import StarRating from '../Components/StarRating/StarRating';
import RestaurantHours from '../Components/RestaurantHours/RestaurantHours';

// ===== List of Liked and Disliked Restaurant ===== 
var likeList = getAllLikes();
var dislikeList = getAllDislikes();

// ===== Get elements by ID ===== 
var moreInfo = document.getElementById("modal");
var infoCard = document.getElementById("infoCard");
var infoImg = document.getElementById("infoImg");
var infoTitle = document.getElementById("infoTitle");
var infoCuisines = document.getElementById("infoCuisines");
var infoRating = document.getElementById("infoRating");
var infoPrice = document.getElementById("infoPrice");

const showMoreInfo = () => {
    moreInfo = document.getElementById("modal");
    infoCard = document.getElementById("infoCard");
    moreInfo.style.display = "block";
}

const handleButtonClick = (restaurant, whichList) => {
    infoCard = document.getElementById("infoCard");
    infoImg = document.getElementById("infoImg");
    infoTitle = document.getElementById("infoTitle");
    infoCuisines = document.getElementById("infoCuisines");
    infoRating = document.getElementById("infoRating");
    infoPrice = document.getElementById("infoPrice");

    if(whichList === "like"){
        infoCard.style.backgroundColor = "#E63946";
    }
    if(whichList === "dislike"){
        infoCard.style.backgroundColor = "#1D3557";
    }
    infoImg.src = restaurant.image_url;
    infoTitle.textContent = restaurant.name;

    const matchingCuisines = restaurant.cuisine.map((cuisine, idx) => {
        if (idx > 2) return;
        return (
            <span className='match-cuisines' key={idx}>
                {cuisine}
            </span>
        );
    });
    ReactDOM.render(matchingCuisines, infoCuisines);

    const ratingEle = <StarRating rating={restaurant.review_avg} total={restaurant.review_count} isOnPrimaryResultPage={true}/>;
    ReactDOM.render(ratingEle, infoRating);

    infoPrice.textContent = restaurant.price;

    showMoreInfo();
};

const DashboardPage = () => {

    //Total numbers of liked and disliked restaurants
    console.log("Liked #: " + likeList.length);
    console.log("Disliked #: " + dislikeList.length);

    const showLikesList = likeList.map((restaurant) => {
        return (
            <div className='list-content'>
                <div className='restaurant-card'>
                    <div className='card-name'>{restaurant.name}</div>
                    <i className='fas fa-info card-info-icon' onClick={() => handleButtonClick(restaurant, "like")}></i>
                </div>
            </div>
        )
    });

    const showDislikesList = dislikeList.map((restaurant) => {
        return (
            <div className='list-content'>
                <div className='restaurant-card'>
                    <div className='card-name'>{restaurant.name}</div>
                    <i className='fas fa-info card-info-icon' onClick={() => handleButtonClick(restaurant, "dislike")}></i>
                </div>
            </div>
        )
    });

    window.onclick = function(event){
        if(event.target == moreInfo){
            moreInfo.style.display = "none";
        }
    }

    return(
        <div className="DashboardPage">
            <div className='dashboard-header'>Dashboard</div>

            <div id="modal" className='moreInfo'>
                <div id="infoCard" className='info'>
                    <img id="infoImg" className='info-image'/>
                    <div className='info-content'>
                        <div id="infoTitle" className='info-title'></div>
                        <div id="infoCuisines" className='info-cuisines'></div>
                        <div id="infoRating" className='info-rating'></div>
                        <div id="infoPrice" className='info-price'></div>
                    </div>
                </div>
            </div>

            <div className='lists-container'>
                <div className='likes-list'>
                    <div className='lList-header'>Likes</div>
                    {showLikesList}
                </div>
                <div className='dislikes-list'>
                    <div className='dlList-header'>Dislikes</div>
                    {showDislikesList}
                </div>
            </div>
        </div>
    )

}

export default DashboardPage;