import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import { UPDATE_ORDER_RESET } from "../constants/orderConstants";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { BiMenu } from "react-icons/bi";
import { ButtonFill } from "./ButtonFill";

function ProcessOrder() {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState(false);

   const showSidebar = () => {
    setToggle((toggle) => !toggle);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
  
    <Fragment>
      <MetaData title="Process Order" />
      <Dashboard>
        <button className="menuToggleBtn" onClick={showSidebar}>
          <BiMenu />
        </button>
        {window.innerWidth <= 1000 ? toggle ? <Sidebar /> : null : <Sidebar />}

        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <div className="orderDetailsContainerBox">
                  <h2>Shipping Info</h2>
                    <div>
                      <p>Name: {order.user && order.user.name}</p>
                    </div>
                    <div>
                      <p>
                        Phone:{" "}
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </p>
                    </div>
                    <div>
                      <p>
                        Address:{" "}
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </p>
                    </div>
                  </div>

                  <div className="orderDetailsContainerBox">
                  <h2>Payment</h2>
                    <div>
                      <p>
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount: {order.totalPrice && order.totalPrice}</p>
                    </div>
                    <div>
                      <p>
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>

                </div>
                <div className="confirmCartItems">
                  <Typography style={{textAlign: "center", fontSize: "2rem", margin: "1rem 0"}}>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
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
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <ButtonFill
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </ButtonFill>
                </form>
              </div>
            </div>
          )}
        </div>
      </Dashboard>
    </Fragment>
  );
}

const Dashboard = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background: #f5f6fb;

  .menuToggleBtn {
    display: none;
  }

  .confirmOrderPage {
    height: 100vh;
    background-color: white;
    display: grid;
    grid-template-columns: 6fr 3fr;
  }

  .confirmOrderPage > div:last-child {
    border-left: 1px solid rgba(0, 0, 0, 0.247);
  }

  .confirmshippingArea {
    padding: 5vmax;
    padding-bottom: 0%;
  }

  .orderDetailsContainerBox > p {
    font: 400 1.8vmax "Poppins";
  }

  .orderDetailsContainerBox{
    height: 100%;
    background-color: #45bfb8;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin: 1rem;

    h2{
      font-family: Poppins;

    }

    p{
      font-family: Poppins;

    }
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
    font: 400 1rem "Poppins";
  }
  
  .confirmCartItemsContainer {
    height: 100%;
    overflow-y: auto;
  }
  
  .confirmCartItemsContainer > div {
    display: flex;
    font: 400 1vmax "Poppins";
    align-items: center;
    justify-content: space-between;
    margin: 2vmax 0;
  }
  
  .confirmCartItemsContainer > div > img {
    width: 5vmax;
  }
  
  .confirmCartItemsContainer > div > a {
    color: #575757;
    margin: 0 2vmax;
    width: 100%;
    text-decoration: none;
  }
  
  .confirmCartItemsContainer > div > span {
    width: 100%;
    font: 100 1vmax "Poppins";
    color: #5e5e5e;
  }

  .updateOrderForm {
    margin: 5vmax 0;
    padding: 3vmax;
    background-color: white;
  }

  .updateOrderForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .updateOrderForm > div > select {
    padding: 1vmax 4vmax;
    margin: 2rem 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
    background: white;
  }



  @media screen and (max-width: 600px) {
    display: flex;
    grid-template-columns: 0;
    flex-direction: column;
    height: 100%;

    .menuToggleBtn {
      display: block;
      padding: 1rem;
      font-size: 2rem;
      z-index: 111;
      background: #45bfb8;
      color: white;
      border: none;
      outline: none;
    }

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

    .confirmCartItemsContainer {
      max-height:100%;
    }

    .confirmCartItemsContainer > div {
      font: 400 4vw "Poppins";
      margin: 4vw 0;
    }

    .confirmCartItemsContainer > div > img {
      width: 30vmax;
    }
    
    .confirmCartItemsContainer > div > a {
      margin: 0 1rem ;
      width: 100%;
    }
    
    .confirmCartItemsContainer > div > span {
      font: 100 4vw "Poppins";
      width: 100%;
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

    .updateOrderForm {
      padding: 5vmax;
    }

    .updateOrderForm > div > select {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .updateOrderForm > div > svg {
      font-size: 2.8vmax;
    }
  }
`;
export default ProcessOrder;
