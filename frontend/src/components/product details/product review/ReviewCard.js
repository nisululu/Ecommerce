import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import profilePic from '../../images/profile.png'
import './ReviewCard.css'

const ReviewCard = ({review}) => {

    const {name, comment, rating, user, _id } = review
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.2)",
        activeColor: "tomato",
        value: rating? rating : 0,
        isHalf: true
      }
      
  return (
    <div className='review-col'>
        <FontAwesomeIcon icon={faQuoteLeft} style={{fontSize:"2vmax", color:"tomato"}}/>
      <p>{comment}</p>
      <ReactStars {...options} size={window.innerWidth<=600?10:24} />
      <img src={profilePic} alt='profile' style={{width:"5vmax", marginTop:"1vmax"}}/>
      <h4>{name}</h4>
    </div>
  )
}

export default ReviewCard
