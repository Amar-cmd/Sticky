import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartAction";

function CartItemCard({ item }) {
  const dispatch = useDispatch();

  const options = {
    edit: false,
    value: item.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <CartItemCardContainer>
      <img src={item.image} alt="ssa" />
      <div className="detailsWrapper">
        <Link to={`/product/${item.product}`}>
          <div className="name">{item.name}</div>
        </Link>
        <div className="ratings">
          <ReactStars className="stars" {...options} />
          <div className="review">({item.numOfReview} reviews)</div>
        </div>
        <div className="availability">
          <p className={item.stock < 1 ? "redColor" : "greenColor"}>
            {item.stock < 1 ? "Out Of Stock" : "In Stock"}
          </p>
        </div>
        <div className="cartAction">
          <div className="cartInput">
            <button
              onClick={() => decreaseQuantity(item.product, item.quantity)}
            >
              -
            </button>
            <input type="number" value={item.quantity} readOnly />
            <button
              onClick={() =>
                increaseQuantity(item.product, item.quantity, item.stock)
              }
            >
              +
            </button>
          </div>
          <div className="border"></div>
          <p className="remove" onClick={() => deleteCartItem(item.product)}>
            Remove
          </p>
        </div>
      </div>
    </CartItemCardContainer>
  );
}

const CartItemCardContainer = styled.div`
  display: flex;
  padding: 1vmax;
  height: 8vmax;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;

  img {
    width: 6vmax;
  }

  .detailsWrapper {
    display: flex;
    margin: 0 1vmax;
    flex-direction: column;
    /* border: 2px solid red; */

    a {
      font: 300 0.9vmax Poppins;
      color: rgba(24, 24, 24, 0.815);
      text-decoration: none;
    }

    span {
      font: 300 0.9vmax "Poppins";
      color: rgba(24, 24, 24, 0.815);
    }

    p {
      /* color: tomato; */
      font: 100 0.8vmax "Poppins";
      cursor: pointer;
    }

    .ratings {
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    .stars {
      display: flex;
      flex-direction: row;
    }

    .review {
      margin-left: 10px;
    }

    .cartAction {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      /* border: 2px solid red; */
      width: 9vmax;
    }

    .border {
      width: 1px;
      height: 1.5vmax;
      background-color: grey;
    }
    .remove {
      color: red;
    }
  }

  @media screen and (max-width: 1200px) {
    display: flex;
    height: 100%;
    align-items: flex-start;
    overflow: hidden;

    img {
      width: 30vw;
      border-radius: 10% 0;
    }

    .name {
      font-size: 1.2rem;
      text-transform: capitalize;
    }

    .detailsWrapper {
      width: 50vw;
      flex-direction: column;

      a {
        font: 300 0.9vmax Poppins;
        color: rgba(24, 24, 24, 0.815);
        text-decoration: none;
      }

      span {
        font: 300 0.9vmax "Poppins";
        color: rgba(24, 24, 24, 0.815);
      }

      p {
        /* color: tomato; */
        font: 100 0.8vmax "Poppins";
        cursor: pointer;
      }

      .ratings {
        display: flex;
        align-items: center;
        flex-direction: row;
      }

      .stars {
        display: flex;
        flex-direction: row;
      }

      .review {
        margin-left: 10px;
      }

      .availability > p {
        font-size: 1rem;
        text-align: start;
      }

      .cartAction {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
      }

      .cartInput {
        button {
          font-size: 1rem;
          width: 4vmax;
          border-radius: 10%;
          background: #45bfb8;
          padding: 1vmax;
          color: white;
        }
        input {
          font-size: 1rem;
        }

        input[type="number"] {
          padding: 0 1rem;
          width: 1.1rem;
          font-size: 1rem;
        }
      }

      .remove {
        color: red;
        font-size: 1rem;
      }
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;

    img {
      width: 50vw;
      border-radius: 5%;
    }

    .name {
      font-size: 1rem;
      text-transform: capitalize;
      text-align: center;
    }

    .detailsWrapper {
      width: 50vw;
      flex-direction: column;

      .availability > p {
        font-size: 0.8rem;
        text-align: center;
      }

      .cartAction {
        justify-content: space-around;
        width: 100%;
      }

      .cartInput {
        button {
          font-size: 1rem;
          width: 4vmax;
          border-radius: 10%;
          background: #45bfb8;
          padding: 1vmax;
          color: white;
          font-size: 1rem;
        }

        input {
          font-size: 1rem;
        }

        input[type="number"] {
          padding: 0 1rem;
          width: 1.1rem;
          font-size: 1rem;
        }
      }

      .border {
        width: 1.5px;
        height: 90%;
      }
      .remove {
        font-size: 0.8rem;
      }
    }
  }
`;
export default CartItemCard;
