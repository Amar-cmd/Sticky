import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { clearError, getProduct } from "../actions/productAction";
import Loader from "./Loader";
import Product from "./Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import Header from "./Header/Header";

const categories = [
  "Assassin's Creed",
  "A Plague Tale",
  "Call Of Duty",
  "Detroit Become Human",
  "Forza Horizon",
  "God Of War",
  "Marvel's Avengers",
  "Red Dead Redemption",
  "Tomb Raider",
  "Uncharted",
];

const StickersPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Stickers" />
          <Header />
          <Wrapper>
            <h2 className="productsHeading">Products</h2>

            <div className="container">
              <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
                </div>
                
              <div className="products">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </div>

            {resultPerPage < productsCount && (
              <PaginationBox>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </PaginationBox>
            )}
          </Wrapper>
        </Fragment>
      )}
    </Fragment>
  );
};
const Wrapper = styled.div`
  .productsHeading {
    margin: 2vmax auto;
    padding: 2vmax;
    color: rgba(0, 0, 0, 0.678);
    font: 500 1.5rem "Poppins";
    text-align: center;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 5fr; 
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5vmax;
    justify-content: center;
    min-height: 30vh;
  }

  .paginationBox {
    display: flex;
    justify-content: center;
    margin: 6vmax;
  }

  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .page-item {
    background-color: rgb(255, 255, 255);
    list-style: none;
    border: 1px solid rgba(0, 0, 0, 0.178);
    padding: 1vmax 1.5vmax;
    transition: all 0.3s;
    cursor: pointer;
  }
  .page-item:first-child {
    border-radius: 5px 0 0 5px;
  }

  .page-item:last-child {
    border-radius: 0 5px 5px 0;
  }
  .page-link {
    text-decoration: none;
    font: 300 0.7vmax "Poppins";
    color: rgb(80, 80, 80);
    transition: all 0.3s;
  }

  .page-item:hover {
    background-color: rgb(230, 230, 230);
  }

  .page-item:hover .page-link {
    color: rgb(0, 0, 0);
  }

  .pageItemActive {
    background-color: tomato;
  }

  .pageLinkActive {
    color: white;
  }

  .filterBox {
    width: 10vmax;
    top: 10vmax;
    left: 4vmax;
  }
  
  .categoryBox {
    /* border: 2px solid red; */
    padding: 0%;
  }

  .category-link {
    list-style: none;
    color: rgba(0, 0, 0, 0.61);
    font: 400 0.8vmax "Poppins";
    margin: 0.4vmax;
    cursor: pointer;
    transition: all 0.5s;
  }
  .category-link:hover {
    color: tomato;
  }

  .filterBox {
    border: 1px solid grey;
    padding: 2rem;
    margin: 0 2rem;
    box-shadow: 10px 5px 6px rgba(0, 0, 0, 0.24);
    /* border: 2px solid red; */
    
  }
  .filterBox > fieldset {
    border: 1px solid rgba(0, 0, 0, 0.329);
  }

  @media screen and (max-width: 1400px) {
    .filterBox {
      width: 20vmax;
      position: static;
      margin: auto;
    }

    .container {
      display: flex;
      flex-direction: column;
    }
    .page-link {
      font: 300 1.7vmax "Poppins";
    }
    .category-link {
      font: 400 1.8vmax "Poppins";
    }
  }
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 6vmax;

  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .page-item {
    background-color: white;
    list-style: none;
    border: 1px solid black;
    padding: 1vmax 1.5vmax;
    transition: all 0.3s;
    cursor: pointer;
  }

  .page-item:first-child {
    border-radius: 15px 0 5px 0;
  }
  .page-item:last-child {
    border-radius: 5px 0 15px 0;
  }

  .page-link {
    text-decoration: none;
    font: 300 0.8rem "Poppins";
    color: rgba(0, 0, 0, 0.9);
    transition: all 0.3s;
  }

  .page-item:hover {
    background-color: #45bfb8;
  }

  .page-item:hover .page-link {
    color: white;
  }

  .pageItemActive {
    background-color: #45bfb8;
  }

  .pageLinkActive {
    color: white;
  }
`;

export default StickersPage;
