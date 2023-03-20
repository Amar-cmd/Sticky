import React from 'react'
import ReactStars from 'react-rating-stars-component'
import styled from 'styled-components';
import profilePng from '../default_user.png'
const ReviewCard = ({ review }) => {
      const options = {
        edit: false,
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
      };
  return (
    <Card>
      <div className="user_info">
        <img src={profilePng} alt="User" className="image" />
        <p className="name">{review.name}</p>
      </div>
      <ReactStars classNames="rating" {...options} />
      <span className="comment">{review.comment}</span>
    </Card>
  );
}

const Card = styled.div`
  width: 80vw;
  margin-bottom: 2rem;
  border: 1px solid #707070;
  padding: 10px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
    box-shadow: 6px 10px 6px rgba(0,0,0,0.16);
  .user_info {
    display: flex;
    align-items: center;
    padding: 1rem;
    /* border: 2px solid red; */
  }
  .image {
    width: 50px;
    padding-right: 1rem;
    /* border: 2px solid red; */
  }

  .rating, .comment {
    padding-left: 1rem;
    padding-bottom: 1rem;
    /* border: 2px solid red; */
  }

`;

export default ReviewCard
