//Reference: https://www.w3schools.com/howto/howto_css_modals.asp
//

import './primary_result.css';
import './primary_result_loader.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalState';
import { addRestaurantToLikes, addRestaurantToDislikes, removeRestaurantFromLikes, removeRestaurantFromDislikes, getAllLikes, getAllDislikes } from '../Context/LocalStorage';
import StarRating from '../Components/StarRating/StarRating';
import RestaurantHours from '../Components/RestaurantHours/RestaurantHours';

// ===== Constants =====
const likeOff = 'far fa-thumbs-up pr-l';
const likeOn = 'fas fa-thumbs-up pr-l';
const dislikeOff = 'far fa-thumbs-down pr-d';
const dislikeOn = 'fas fa-thumbs-down pr-d';
var modal = document.getElementById("more-info");
var card = document.getElementById("card");

const backendURL = 'http://localhost:8000';

// ===== Global Variables =====
var hasLoaded = false;

// ===== List of Liked and Disliked Restaurant ===== 
var likeList = getAllLikes();
var dislikeList = getAllDislikes();

// ===== Default State =====
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

 // ===== Functions to Update State =====
 const handleButtonClick = (restaurant, buttonID, idxLike, idxDislike) =>{
    if(buttonID === 1){ // Like Case
      var inLikedList = false;

      //remove from disliked list if like button is pressed
      for(let i=0; i<dislikeList.length; i++){
        if(restaurant.id === dislikeList[i].id){
          removeRestaurantFromDislikes(restaurant.id);
          console.log(restaurant.name + " is removed from Disiked list");
          dislikeList = getAllDislikes(); //update disliked list
          console.log("Disliked #: " + dislikeList.length);
          document.getElementById(idxDislike).className = defaultDislikeButton(restaurant);//update dislike button (classname)
        }
      }

      //remove from liked list if press the toggled like button
      for(let i=0; i<likeList.length; i++){
        if(restaurant.id === likeList[i].id){
          inLikedList = true;
          removeRestaurantFromLikes(restaurant.id);
          console.log(restaurant.name + " is removed from Liked list");
        }
      }
      //add to liked list if press the untoggled like button
      if(inLikedList === false){
        modal = document.getElementById("more-info");
        modal.style.display = "block";
        addRestaurantToLikes(restaurant);
        console.log(restaurant.name + " is added to Liked list");
      }
      likeList = getAllLikes(); //update liked list
      console.log("Liked #: " + likeList.length);
      document.getElementById(idxLike).className = defaultLikeButton(restaurant); //update classname for like buttons
    }

    if(buttonID === 0){ // Dislike Case
      var inDislikedList = false;

      //remove from liked list if dislike button is pressed
      for(let i=0; i<likeList.length; i++){
        if(restaurant.id === likeList[i].id){
          removeRestaurantFromLikes(restaurant.id);
          console.log(restaurant.name + " is removed from Liked list");
          likeList = getAllLikes();
          console.log("Liked #: " + likeList.length);
          document.getElementById(idxLike).className = defaultLikeButton(restaurant);
        }
      }

      //remove from disliked list if press the toggled dislike button
      for(let i=0; i<dislikeList.length; i++){
        if(restaurant.id === dislikeList[i].id){
          inDislikedList = true;
          removeRestaurantFromDislikes(restaurant.id);
          console.log(restaurant.name + " is removed from Disliked list");
        }
      }
      //add to disliked list if press the untoggled dislike button
      if(inDislikedList === false){
        addRestaurantToDislikes(restaurant);
        console.log(restaurant.name + " is added to Disliked list");
      }
      dislikeList = getAllDislikes(); //update disliked list
      console.log("Disliked #: " + dislikeList.length);
      document.getElementById(idxDislike).className = defaultDislikeButton(restaurant); //update classname for dislike buttons
    }
  }

    const showModal = () => {
        modal = document.getElementById("more-info");
        modal.style.display = "block";
    }

const PrimaryResultPage = () => {
    const navigate = useNavigate();

    //Total numbers of liked and disliked restaurants
    console.log("Liked #: " + likeList.length);
    console.log("Disliked #: " + dislikeList.length);

    const { restaurantList } = useContext(GlobalContext);
    const restaurant = restaurantList[0];

    const [restaurantHours, updateHours] = useState(null);
    const [restaurantImgs, updateImgs] = useState(null);

    const handleSeeMore = () => {
        navigate('/results', { replace: false });
    }

    const redirectFilter = () => {
        navigate('/filter');
    }
    
    if (restaurant == null) {
        return (
            <><div className='noRestaurant'>
            No restaurants currently meet your criteria
          </div><div>
              <button
                className='refindbutton'
                onClick={redirectFilter}
              > Refine Your Search
              </button>
            </div></>

        )
    }

    const matchingCuisines = restaurant.cuisine.map((cuisine, idx) => {
        if (idx > 2) return;
        return (
            <div className='pr-filter-match' key={idx}>
                {cuisine}
            </div>
        );
    });

    window.onclick = function(event){
        if(event.target == modal){
            modal.style.display = "none";
        }
    }

    card.onclick = () => showModal();

    const fetchDetails = () => {
      if (hasLoaded) return;

      const searchString = backendURL + '/details/' + restaurant.id;
      console.log('Searching on bite-backend at:\n' + searchString);
      axios.get(searchString).then((res) => {
        updateHours(res.data.hours);
        updateImgs(res.data.photos);
        hasLoaded = true;
  
      }).catch((err) => {
          console.log('Error with backend API: ' + err.message);
      });
    }

    const renderImgs = (imagesList) => {
      return imagesList.map((img, idx) => (
        <div key={idx}>
          <img src={img} alt={restaurant.name + ' Yelp image ' + idx} className='pr-img'/>
        </div>
      ));
    }

    setTimeout(() => {
      fetchDetails();
    }, 2500);
    
    return (
        <div className="PrimaryResultPage">

            {/* ===== Modal ===== */}
            <div id="more-info" className="modal">
                {/* ===== Modal content ===== */}
                <div className="modal-content">
                    <img id="restaurant-image" className='modal-image' src={restaurant.image_url} alt={restaurant.name + ' Yelp image'}/>
                    <div className='modal-info'>
                        <div className='modal-title'>{restaurant.name}</div>
                        <div className='modal-filter-matches'>{matchingCuisines}</div>
                        <div className='modal-phone'>{restaurant.display_phone}</div>
                        <a href={'https://www.google.com/maps/place/' + restaurant.address.replaceAll(' ', '+').replaceAll('\n', '+')} target='_blank'>
                            <div className='modal-address'>{restaurant.address}</div>
                        </a>
                        <div className='modal-distance'>{Math.round(restaurant.distance*100)/100} mi away</div>
                        <RestaurantHours hoursList={restaurantHours} />
                    </div>    
                </div>

            </div>
        
            <div id="card" className='pr-card-holder'>
                {/* If images have not loaded yet, render a spinner */
                  restaurantImgs === null &&
                  (
                    <div className='pr-loading'>
                      {/* Loading spinner courtesy of https://loading.io/css/ */}
                      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                  )
                }
                {/* If images are loaded, render the image carousel */
                  restaurantImgs !== null &&
                  (
                    <Carousel className='pr-carousel' showThumbs={false} dynamicHeight={true} infiniteLoop={true} renderIndicator={() => (<div/>)}>
                      {renderImgs(restaurantImgs)}
                    </Carousel>
                  )
                }
                
                <div className='pr-card-content'>
                    <div className='pr-title'>
                        {'Best Bite for you: ' + restaurant.name}
                    </div>
                    <div className='pr-star'>
                        <StarRating rating={restaurant.review_avg} total={restaurant.review_count} isOnPrimaryResultPage={true} />
                    </div>
                    <div className='pr-filter-matches'>
                        {matchingCuisines}
                    </div>
                    <br></br>
                    <div className='pr-price'>
                        {restaurant.price}
                    </div>
                </div>
            </div>
            <div className='gird-apply'>
                <i id="primary-like" className={defaultLikeButton(restaurant)} onClick={() => handleButtonClick(restaurant, 1, "primary-like", "primary-dislike")}></i>
                &nbsp; &nbsp; 
                <div className='pr-more-results' onClick={handleSeeMore}>More<br></br>Matches</div>
                &nbsp; &nbsp; 
                <i id="primary-dislike" className={defaultDislikeButton(restaurant)} onClick={() => handleButtonClick(restaurant, 0, "primary-like", "primary-dislike")}></i>
            </div>
        </div>
    );
}

export default PrimaryResultPage;