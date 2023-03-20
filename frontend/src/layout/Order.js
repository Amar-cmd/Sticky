import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";


function Order() {

    const navigate = useNavigate();
     const { shippingInfo, cartItems } = useSelector((state) => state.cart);
     const { user } = useSelector((state) => state.user);

     const subtotal = cartItems.reduce(
       (acc, item) => acc + item.quantity * item.price,
       0
     );

     const shippingCharges = subtotal > 1000 ? 0 : 200;

     const tax = subtotal * 0.18;

     const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    
     const proceedToPayment = () => {
       const data = {
         subtotal,
         shippingCharges,
         tax,
         totalPrice,
       };

       sessionStorage.setItem("orderInfo", JSON.stringify(data));

       navigate("/process/payment");
     };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <Header/>
      <CheckoutSteps activeStep={1} />
      <ConfirmOrderPage>
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items: ({ cartItems.length } item) </Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              {/* <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div> */}
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </ConfirmOrderPage>
    </Fragment>
  );
}

const ConfirmOrderPage = styled.div`
  height: 100%;
  background-color: white;
  display: grid;
  grid-template-columns: 6fr 3fr;

  .confirmOrderPage > div:last-child {
    border-left: 1px solid rgba(0, 0, 0, 0.247);
  }

  .confirmshippingArea {
    padding: 5vmax;
    padding-bottom: 0%;
  }

  .confirmshippingArea > p {
    font: 400 1.8vmax "Poppins";
  }

  .confirmshippingAreaBox,
  .confirmCartItemsContainer {
    margin: 2vmax;
  }

  .confirmshippingAreaBox > div {
    display: flex;
    margin: 1vmax 0;
  }

  .confirmshippingAreaBox > div > p {
    font: 400 1vmax "Poppins";
    color: black;
  }
  .confirmshippingAreaBox > div > span {
    margin: 0 1vmax;
    font: 100 1vmax "Poppins";
    color: #575757;
  }

  .confirmCartItems > p {
    font: 400 1.8vmax "Poppins";
  }

  .confirmCartItems {
    padding: 5vmax;
    padding-top: 2vmax;
  }

  .confirmCartItemsContainer {
    overflow-y: auto;
    height: 100%;
  }

  .confirmCartItemsContainer > div {
    display: flex;
    font: 400 1vmax "Poppins";
    align-items: center;
    justify-content: space-between;
    margin: 2vmax 0;
  }

  .confirmCartItemsContainer > div > img {
    width: 3vmax;
  }

  .confirmCartItemsContainer > div > a {
    color: #575757;
    margin: 0 2vmax;
    width: 60%;
    text-decoration: none;
  }

  .confirmCartItemsContainer > div > span {
    font: 100 1vmax "Poppins";
    color: #5e5e5e;
  }

  .orderSummary {
    padding: 7vmax;
  }

  .orderSummary > p {
    text-align: center;
    font: 400 1.8vmax "Poppins";
    border-bottom: 1px solid rgba(0, 0, 0, 0.267);
    padding: 1vmax;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
  }

  .orderSummary > div > div {
    display: flex;
    font: 300 1vmax "Poppins";
    justify-content: space-between;
    margin: 2vmax 0;
  }
  .orderSummary > div > div > span {
    color: rgba(0, 0, 0, 0.692);
  }

  .orderSummaryTotal {
    display: flex;
    font: 300 1vmax "Poppins";
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.363);
    padding: 2vmax 0;
  }

  .orderSummary > button {
    background-color: #45bfb8;
    color: white;
    width: 100%;
    padding: 1vmax;
    border: none;
    margin: auto;
    cursor: pointer;
    transition: 0.5s;
    font: 400 1vmax "Poppins";
  }

  .orderSummary > button:hover {
    background-color: white;
    border: 1px solid #45bfb8;
    color: #45bfb8;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    display: flex;
    /* border: 2px solid red; */
    .confirmOrderPage {
      grid-template-columns: 1fr;
      height: unset;
    }

    .confirmOrderPage > div:last-child {
      border-left: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.247);
    }

    .confirmshippingArea > p {
      font: 400 6vw "Poppins";
    }
    .confirmshippingArea > p > span {
      font: 400 1rem "Poppins";
    }

    .confirmshippingAreaBox > div {
      display: flex;
      margin: 6vw 0;
    }

    .confirmshippingAreaBox > div > p {
      font: 400 4vw "Poppins";
    }
    .confirmshippingAreaBox > div > span {
      font: 100 4vw "Poppins";
    }

    .confirmCartItems > p {
      font: 400 6vw "Poppins";
    }

    .confirmCartItemsContainer > div {
      font: 400 4vw "Poppins";
      margin: 4vw 0;
    }

    .confirmCartItemsContainer > div > img {
      width: 10vw;
    }

    .confirmCartItemsContainer > div > a {
      margin: 0;
      width: 30%;
    }

    .confirmCartItemsContainer > div > span {
      font: 100 4vw "Poppins";
    }

    .orderSummary {
      padding: 12vw;
    }

    .orderSummary > p {
      font: 400 6vw "Poppins";
      padding: 4vw;
    }

    .orderSummary > div > div {
      font: 300 4vw "Poppins";
    }

    .orderSummaryTotal {
      font: 300 4vw "Poppins";
      padding: 5vw 0;
    }

    .orderSummary > button {
      padding: 4vw;
      margin: 4vw auto;
      font: 400 4vw "Poppins";
    }
  }
`;

export default Order;
