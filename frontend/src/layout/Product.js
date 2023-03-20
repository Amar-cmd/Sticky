import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";

const Product = ({ product }) => {
  const options = {
    edit: false,
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Link to={`/product/${product._id}`}>
      <ProductCard className="productCard">
        <img
          className="thumbnail"
          src={product.images[0].url}
          alt={product.name}
        />

        <div className="details">
          <div className="top">
            <p className="name">{product.name}</p>
            <ReactStars className="stars" {...options} />
          </div>
          <div className="bottom">
            <p>{`${product.quantity} Stickers`}</p>
            <p>{`₹${product.price}`}</p>
          </div>
        </div>
      </ProductCard>
    </Link>
  );
};

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: rgb(48, 48, 48);
  /* margin: 1vmax; */
  transition: all 0.5s;
  /* padding-bottom: 0.5vmax; */
  padding: 1rem;
  /* border: 2px solid red; */

  :hover {
    box-shadow: 0 0 5px rgba(15, 15, 15, 0.25);
  }

  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    /* border: 2px solid red; */

    p {
      font-family: Poppins;

      text-decoration: none;
      text-transform: capitalize;
      border: none;
    }

    p.name {
      font-family: Poppins;
      font-weight: 500;
      text-decoration: none;
      text-transform: capitalize;
    }
  }

  .top,
  .bottom {
    /* border: 2px solid red; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .thumbnail {
    width: 17vmax;
    border: 1px solid black;
    /* height: 180px; */
  }

  @media screen and (max-width: 1400px) {
    .details {
      display: flex;
      flex-direction: column;
      border: 1px solid black;
    }

    .top,
    .bottom {
      display: flex;
      flex-direction: column;
    }

    .thumbnail {
      width: 30vmax;
    }
  }
`;
export default Product;
