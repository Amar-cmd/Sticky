import React, { Fragment } from "react";
import styled from "styled-components";
import CartItemCard from "./CartItemCard";
import { ButtonFill } from "./ButtonFill";
import { useSelector } from "react-redux";
import img from "../empty_bag.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";

function Cart() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <Fragment>
      <Header />
      {cartItems.length === 0 ? (
        <EmptyContainer>
          <img src={img} alt="Empty Bag" />
          <p>I Am Feeling Empty From Inside. 😢</p>
          <Link to="/products">
            <ButtonFill>Continue Shopping</ButtonFill>
          </Link>
        </EmptyContainer>
      ) : (
        <Container>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Your Cart</p>
              <p className="itemLength">Total Items: {cartItems.length}</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} />

                  <p className="cartSubtotal">{` ₹${item.price} x ${
                    item.quantity
                  } = ₹${item.price * item.quantity}`}</p>
                </div>
              ))}
          </div>
          <div className="summary">
            <div className="cartGrossProfitBox">
              <h3>{`Subtotal: ₹${cartItems.reduce(
                (accu, item) => accu + item.quantity * item.price,
                0
              )}`}</h3>
              <p>{`(${cartItems.length} items)`}</p>
              <ButtonFill className="buy" onClick={checkoutHandler}>
                Buy Now
              </ButtonFill>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
}

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  img {
    width: 30vw;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1vmax;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5vmax;

  .cartPage {
    padding: 4vmax;
    width: 80vw;

    .cartHeader {
      width: 90%;
      box-sizing: border-box;
      margin: auto;
      color: black;
      display: grid;
      grid-template-columns: 3fr 1fr;
      font: 300 0.7vmax "Poppins";
      font-size: 1.5rem;
    }
    .cartHeader > p {
      padding: 1vmax 0;
    }
    .cartHeader > p:last-child {
      text-align: end;
    }

    .cartContainer {
      width: 90%;
      margin: 0.5vmax auto;
      display: grid;
      grid-template-columns: 3fr 1fr;
      border: 2px solid rgba(231, 231, 231, 0.7);
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
    }

    .cartInput {
      display: flex;
      align-items: center;
    }

    .cartInput > button {
      border: none;
      background-color: white;
      padding: 0.5vmax;
      cursor: pointer;
      color: black;
      transition: all 0.2s;
    }
    .cartInput > button:hover {
      background-color: #45bfb8;
      color: white;
    }

    .cartInput > input {
      border: none;
      padding: 0.5vmax;
      width: 1vmax;
      text-align: center;
      outline: none;
      font: 400 0.8vmax "Poppins";
      color: rgba(0, 0, 0, 0.74);
    }

    .cartSubtotal {
      display: flex;
      padding: 0.5vmax;
      height: 8vmax;
      align-items: center;
      box-sizing: border-box;
      font: 300 1vmax cursive;
      justify-content: flex-end;
      color: rgba(0, 0, 0, 0.753);
    }
  }

  .summary {
    width: 20vw;
    padding-right: 1vmax;
    padding-bottom: 1vmax;

    .cartGrossProfitBox {
      border: 2px solid rgba(0, 0, 0, 0.06);
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        margin-top: 1vmax;
        margin-left: 1vmax;
      }

      p {
        margin: 0 1vmax;
      }

      .buy {
        margin-top: 1vmax;
        margin-left: 1vmax;
        margin-bottom: 1vmax;
        width: 10vw;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    padding: 5vmax;

    .summary {
      width: 70vw;

      .cartGrossProfitBox {
        border: 2px solid rgba(0, 0, 0, 0.06);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        h3 {
        }

        p {
          font-size: 0.8rem;
          margin: 0 2vmax;
        }

        .buy {
          margin-top: 1vmax;
          margin-left: 1vmax;
          margin-bottom: 1vmax;
          width: auto;
        }
      }
    }

    .cartPage {
      padding: 2vmax;
      width: 100vw;

      .cartHeader {
        width: 90%;
        box-sizing: border-box;
        margin: auto;
        color: black;
        display: grid;
        grid-template-columns: 3fr 1fr;
        font-size: 1.5rem;
      }
      .cartHeader > p {
        font: 300 1rem "Poppins";
        font-size-adjust: 0.58;
        text-transform: capitalize;
        padding: 1vmax 0;
      }
      .itemLength {
        display: none;
      }

      .cartContainer {
        width: 100%;
        margin: 0.5vmax 0;
        display: grid;
        grid-template-columns: 3fr 1fr;
      }

      .cartInput > input {
        border: none;
        padding: 0.5vmax;
        width: 1vmax;
        text-align: center;
        outline: none;
        font: 400 0.8vmax "Poppins";
        color: rgba(0, 0, 0, 0.74);
      }

      .cartSubtotal {
        display: flex;
        padding: 0.5vmax;
        height: 8vmax;
        align-items: center;
        box-sizing: border-box;
        font: 400 1rem Poppins;
        justify-content: flex-start;
        color: rgba(0, 0, 0, 0.753);
      }
    }
  }

`;

export default Cart;
