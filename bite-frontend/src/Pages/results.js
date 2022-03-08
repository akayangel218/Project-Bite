//Peer Programming:
//Jackie Wong
//Marvin Xu

import React, { useContext } from 'react';
import '../App.css';
import './results.css';
import { GlobalContext } from '../Context/GlobalState';
import { addRestaurantToLikes, addRestaurantToDislikes, removeRestaurantFromLikes, removeRestaurantFromDislikes, getAllLikes, getAllDislikes } from '../Context/LocalStorage';
import StarRating from '../Components/StarRating/StarRating';

// ===== Constants =====
const likeOff = 'far fa-thumbs-up r-l';
const likeOn = 'fas fa-thumbs-up r-l l-selected';
const dislikeOff = 'far fa-thumbs-down r-d';
const dislikeOn = 'fas fa-thumbs-down r-d dl-selected';

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

const ResultsPage = () => {
  const { restaurantList } = useContext(GlobalContext);

  if (restaurantList <= 1) {
      return(
        <div className='noRestaurant'>
          No other resturants currently meet your criteria.
        </div>
      )
  }

  // ===== Functions to Update State =====
  const handleButtonClick = (restaurant, buttonID, idxLike, idxDislike) =>{
    //Step 1: Check if the restaurant is in the liked/disliked list (display toggle/untoggle button)
    //Step 2: When like/dislike button is clicked,
                //cases: 1. neither is clicked at first, toggle like/dislike button
                      // 2. either one was already toggled, toggle one and untoggle the other one
    //Step 3: When like/dislike button is clicked, save restaurant to the list
    
    if(buttonID === 1){ // Like Case
      var inLikedList = false;

      //remove from disliked list if like button is pressed
      for(let i=0; i<dislikeList.length; i++){
        if(restaurant.id === dislikeList[i].id){
          removeRestaurantFromDislikes(restaurant.id);
          dislikeList = getAllDislikes(); //update disliked list
          document.getElementById(idxDislike).className = defaultDislikeButton(restaurant);//update dislike button (classname)
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
      document.getElementById(idxLike).className = defaultLikeButton(restaurant); //update classname for like buttons
    }

    if(buttonID === 0){ // Dislike Case
      var inDislikedList = false;

      //remove from liked list if dislike button is pressed
      for(let i=0; i<likeList.length; i++){
        if(restaurant.id === likeList[i].id){
          removeRestaurantFromLikes(restaurant.id);
          likeList = getAllLikes();
          document.getElementById(idxLike).className = defaultLikeButton(restaurant);
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
      document.getElementById(idxDislike).className = defaultDislikeButton(restaurant); //update classname for dislike buttons
    }
  }

  const restaurantMarkup = restaurantList.map((restaurant, idx) => {

    if (idx === 0) return <span key={idx}></span>;
    return (
      <div key={idx} className='card'>
        <img src={restaurant.image_url} alt={restaurant.name + ' Yelp image'} className='img'/>
        <div className='container'>
          <span className='name'>
            {restaurant.name}
          </span>
          <div className='stars'>
            <StarRating rating={restaurant.review_avg} total={restaurant.review_count} />
          </div>
          <div className='button-items'>
            <i id={idx} className={defaultLikeButton(restaurant)} onClick={() => handleButtonClick(restaurant, 1, idx, "dis"+idx)}></i>
            &nbsp; &nbsp; 
            <i id={"dis"+idx} className={defaultDislikeButton(restaurant)} onClick={() => handleButtonClick(restaurant, 0, idx, "dis"+idx)}></i>
          </div>
          <div className='desc'>
            {restaurant.cuisine.toString().replaceAll(',', ', ')}
          </div>
          <div className='price'>
            {restaurant.price}
          </div>
        </div>
      </div>
    )
  });

  return (
    <div className="ResultsPage">
        <ul className='results'>
          {restaurantMarkup}
        </ul>
    </div>
  );
}

export default ResultsPage;