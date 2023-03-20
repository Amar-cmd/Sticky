import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import img from "../payment.png";
function OrderSuccess() {
  const { width, height } = useWindowSize();

  return (
    <Ordersuccess>
      <Confetti width={width} height={height} />
      <Typography>Congratulations!🥳</Typography>
      <img src={img} alt="Congrats! Your Order Has Been Placed Successfully."/>

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </Ordersuccess>
  );
}

const Ordersuccess = styled.div`
  margin: auto;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    margin-bottom: 2vmax;
  }
  p {
    font-size: 2vmax;
    padding-bottom: 2vmax;
    overflow: hidden;
  }
  a {
    background-color: #45bfb8;
    color: white;
    border: none;
    padding: 1vmax 3vmax;
    cursor: pointer;
    font: 400 1vmax "Roboto";
    text-decoration: none;
    margin: 2vmax;
    transition: 0.2s all;

    :hover {
      transition: 0.2s all;
      background-color: white;
      border: 1px solid #45bfb8;
      color: #45bfb8;
    }
  }

  @media screen and (max-width: 800px) {
    a {
      padding: 3vw 6vw;
      font: 400 4vw "Roboto";
      margin: 2vmax;
    }

    img {
      width: 90%;
      margin: 2vmax;
    }
    p {
      margin: 2vmax;
      font-size: 5vw;
    }
  }

`;
export default OrderSuccess;
