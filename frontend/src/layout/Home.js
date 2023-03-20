import React, { useEffect } from "react";
import styled from "styled-components";
import Footers from "./Footer";
import Product from "./Product";
import MetaData from "./MetaData";
import { clearError, getProduct } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import Header from "./Header/Header";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
            <MetaData title="Sticky" />
            <Header/>
          <SectionOne>
            <div className="wrapper">
              <div className="firstRow">
                <div className="box"></div>
              </div>
              <div className="secondRow">
                <img src="./images/laptop.png" alt="laptop" />
              </div>
              <div className="thirdRow">
                <div className="box"></div>
              </div>
            </div>
          </SectionOne>

          <SectionTwo>
            <div className="heading">
              <div className="line"></div>
              <h2 className="black">Featured</h2>
              <h2 className="color">Products</h2>
              <div className="line"></div>
            </div>
            <div className="container">
              {products &&
                products.map((product, index) => index  < 6 &&(
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </SectionTwo>
          <Footers />
        </>
      )}
    </>
  );
}

const SectionOne = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to left bottom, #00ffd6, #ff00db);

  .wrapper {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 3.5rem;
  }
  .firstRow {
    width: 60%;
    height: 40%;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    .box {
      width: 50%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
    }
  }

  .secondRow {
    width: 70%;
    height: 70%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    overflow-y: hidden;
    img {
      width: 50%;
      animation: highlight 1.8s infinite;
    }

    @keyframes highlight {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  .thirdRow {
    width: 60%;
    height: 45%;
    .box {
      width: 50%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
    }
  }

  @media screen and (max-width: 800px) {
    .firstRow {
      display: none;
    }

    .secondRow {
      width: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      overflow-y: hidden;
      img {
        width: 80%;
        animation: highlight 1.8s infinite;
      }

      @keyframes highlight {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    }

    .thirdRow {
      display: none;
    }
  }
`;

const SectionTwo = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
  .heading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    overflow: hidden;
  }

  .line {
    width: 200px;
    height: 5px;
    margin: 0 1rem;
    background-color: #45bfb8;
  }
  
  .black {
    font-weight: 800;
    font-size: 2.5rem;
    font-family: Poppins;
    padding: 0 0.5rem;
  }
  
  .color {
    padding: 0.5rem;
    font-family: Poppins;

    font-weight: 800;
    font-size: 2.5rem;
    color: #45bfb8;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70vw;
    flex-wrap: wrap;
    overflow: hidden;
  }

  @media screen and (max-width: 800px) {
    .heading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;

      .line {
        display: none;
      }
      h2 {
        font-size: 1.3rem;
        padding: 1rem;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .heading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      h2 {
        font-size: 1.3rem;
        padding: 1rem;
      }
    }
  }
`;
export default Home;
