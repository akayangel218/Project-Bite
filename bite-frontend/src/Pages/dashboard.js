//Reference: https://www.better.dev/displaying-lists-in-react-jsx
//
//Peer Programming:
//Jackie Wong
//Marvin Xu

import './dashboard.css';
import ReactDOM from 'react-dom';
import { addRestaurantToLikes, addRestaurantToDislikes, removeRestaurantFromLikes, removeRestaurantFromDislikes, getAllLikes, getAllDislikes } from '../Context/LocalStorage';
import StarRating from '../Components/StarRating/StarRating';

// ===== List of Liked and Disliked Restaurant ===== 
var likeList = getAllLikes();
var dislikeList = getAllDislikes();

// ===== Like/Dislike Buttons =====
const likeOff = 'far fa-thumbs-up button-DB';
const likeOn = 'fas fa-thumbs-up button-DB';
const dislikeOff = 'far fa-thumbs-down button-DB';
const dislikeOn = 'fas fa-thumbs-down button-DB';

// ===== Get elements by ID ===== 
var moreInfo = document.getElementById("modal");
var infoCard = document.getElementById("infoCard");
var infoImg = document.getElementById("infoImg");
var infoTitle = document.getElementById("infoTitle");
var infoCuisines = document.getElementById("infoCuisines");
var infoRating = document.getElementById("infoRating");
var infoPrice = document.getElementById("infoPrice");
var infoLoc = document.getElementById("infoLoc");
var infoLike = document.getElementById("infoLike");
var infoDislike = document.getElementById("infoDislike");


const showMoreInfo = () => {
    moreInfo = document.getElementById("modal");
    infoCard = document.getElementById("infoCard");
    moreInfo.style.display = "block";
}

const defaultLikeButton = (restaurant) => {  //decide which like button to show (toggled? not toggled?)
    likeList = getAllLikes();
    for(let i=0; i<likeList.length; i++){
      if(likeList[i].id === restaurant.id){
         return(likeOn);
      }
    }
    return(likeOff);
};

const defaultDislikeButton = (restaurant) => {  //decide which dislike button to show (toggled? not toggled?)
    dislikeList = getAllDislikes();
    for(let i=0; i<dislikeList.length; i++){
      if(dislikeList[i].id === restaurant.id){
         return(dislikeOn);
      }
    }
    return(dislikeOff);
};

const likeButtonClick = (restaurant) => {
    var inLikedList = false;
    infoLike = document.getElementById("infoLike");
    infoDislike = document.getElementById("infoDislike");

    //remove from disliked list if like button is pressed
    for(let i=0; i<dislikeList.length; i++){
            if(restaurant.id === dislikeList[i].id){
            removeRestaurantFromDislikes(restaurant.id);
            dislikeList = getAllDislikes(); //update disliked list
            infoDislike.className = defaultDislikeButton(restaurant);
        }
    }
    //remove from liked list if press the toggled like button
    for(let i=0; i<likeList.length; i++){
            if(restaurant.id === likeList[i].id){
            inLikedList = true;
            removeRestaurantFromLikes(restaurant.id);
        }
    }
    //add to liked list if press the untoggled like button
    if(inLikedList === false){
        addRestaurantToLikes(restaurant);
    }
    likeList = getAllLikes(); //update liked list
    infoLike.className = defaultLikeButton(restaurant);
};

const dislikeButtonClick = (restaurant) => {
    var inDislikedList = false;
    infoLike = document.getElementById("infoLike");
    infoDislike = document.getElementById("infoDislike");

    //remove from liked list if dislike button is pressed
    for(let i=0; i<likeList.length; i++){
      if(restaurant.id === likeList[i].id){
        removeRestaurantFromLikes(restaurant.id);
        likeList = getAllLikes();
        infoLike.className = defaultLikeButton(restaurant);
      }
    }

    //remove from disliked list if press the toggled dislike button
    for(let i=0; i<dislikeList.length; i++){
      if(restaurant.id === dislikeList[i].id){
        inDislikedList = true;
        removeRestaurantFromDislikes(restaurant.id);
      }
    }
    //add to disliked list if press the untoggled dislike button
    if(inDislikedList === false){
      addRestaurantToDislikes(restaurant);
    }
    dislikeList = getAllDislikes(); //update disliked list
    infoDislike.className = defaultDislikeButton(restaurant);
};

const handleButtonClick = (restaurant, whichList) => {
    infoCard = document.getElementById("infoCard");
    infoImg = document.getElementById("infoImg");
    infoTitle = document.getElementById("infoTitle");
    infoCuisines = document.getElementById("infoCuisines");
    infoRating = document.getElementById("infoRating");
    infoPrice = document.getElementById("infoPrice");
    infoLoc = document.getElementById("infoLoc");
    infoLike = document.getElementById("infoLike");
    infoDislike = document.getElementById("infoDislike");

    //Different background color according to like/dislike
    if(whichList === "like"){
        infoCard.style.backgroundColor = "#E63946";
    }
    if(whichList === "dislike"){
        infoCard.style.backgroundColor = "#1D3557";
    }
    infoImg.src = restaurant.image_url;
    infoTitle.textContent = restaurant.name;
    //Cuisine Tags
    const matchingCuisines = restaurant.cuisine.map((cuisine, idx) => {
        if (idx > 2) return <span key={idx}></span>;
        return (
            <span className='match-cuisines' key={idx}>
                {cuisine}
            </span>
        );
    });
    ReactDOM.render(matchingCuisines, infoCuisines);
    
    //Display Like Button
    infoLike.className = defaultLikeButton(restaurant);
    infoLike.onclick = () => likeButtonClick(restaurant);
    //Display Dislike Button
    infoDislike.className = defaultDislikeButton(restaurant);
    infoDislike.onclick = () => dislikeButtonClick(restaurant);

    //Rating
    const ratingEle = <StarRating rating={restaurant.review_avg} total={restaurant.review_count} isOnPrimaryResultPage={true}/>;
    ReactDOM.render(ratingEle, infoRating);
    //Price
    infoPrice.textContent = restaurant.price;
    //Location
    infoLoc.textContent = restaurant.address;
    infoLoc.href = 'https://www.google.com/maps/place/' + restaurant.address.replaceAll(' ', '+').replaceAll('\n', '+');

    showMoreInfo();
};

const DashboardPage = () => {

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
        if(event.target === moreInfo){
            moreInfo.style.display = "none";
        }
    }

    return(
        <div className="DashboardPage">
            <div className='dashboard-header'>Dashboard</div>

            <div id="modal" className='moreInfo'>
                <div id="infoCard" className='info'>
                    <img id="infoImg" alt="Yelp Img" className='info-image'/>
                    <div className='info-content'>
                        <div id="infoTitle" className='info-title'></div>
                        <div id="infoCuisines" className='info-cuisines'></div>
                        {/* BUTTONS */}
                        <div className='button-items-DB'>
                            <i id="infoLike" className={likeOff}></i>
                            &nbsp; &nbsp; 
                            <i id="infoDislike" className={dislikeOff}></i>
                        </div>

                        <div id="infoRating" className='info-rating'></div>
                        <div id="infoPrice" className='info-price'></div>
                        <a id="infoLoc" className='info-loc' href='/dashboard' target='_blank' rel='noreferrer'>  </a>
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