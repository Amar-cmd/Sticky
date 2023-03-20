import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import Loader from "../Loader";
import MetaData from "../MetaData";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaTruck } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { TfiMedall } from "react-icons/tfi";
import { ButtonFill } from "../ButtonFill";
import { ButtonOutline } from "../ButtonOutline";
import ReviewCard from "../ReviewCard";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Header from "../Header/Header";
// import { PinchView } from "react-pinch-zoom-pan";
import Zoom from "react-img-hover-zoom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    readOnly: true,
    value: product.ratings,
    size: "medium",
    precision: 0.1,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`} />

          <Container>
            {/* Product Details and Carousel */}
            <div className="container">
              <div className="wrapper">
                <div className="slides">
                  <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <Zoom
                          className="CarouselImage"
                          key={i}
                          img={item.url}
                          alt={`${i} Slide`}
                          zoomScale={3.5}
                          width={1000}
                          height={600}
                        />
                        // <img
                        //   key={i}
                        //   src={item.url}
                        //   alt={`${i} Slide`}

                        // />
                      ))}
                  </Carousel>
                </div>

                <ProductDetail>
                  <div className="productDetails">
                    <div className="detailsBlock-1">
                      <h1>{product.name}</h1>
                    </div>

                    <div className="detailsBlock-2">
                      <Rating {...options} />
                      <span className="detailsBlock-2-span">
                        {" "}
                        ({product.numOfReviews} Reviews)
                      </span>
                    </div>

                    <hr />
                    <div className="detailsBlock-3">
                      <p>MRP: &nbsp;</p>
                      <span>
                        <h3>{` ₹${product.price}`}</h3>
                      </span>
                    </div>
                    <hr className="hr" />

                    <Icons>
                      <div className="wrap">
                        <div className="style">
                          <FaTruck className="icon" />
                        </div>
                        <p>Free Delivery</p>
                      </div>

                      <div className="wrap">
                        <div className="style">
                          <BiRupee className="icon" />
                        </div>
                        <p>Affordable</p>
                      </div>

                      <div className="wrap">
                        <div className="style">
                          <TfiMedall className="icon" />
                        </div>
                        <p>High Quality</p>
                      </div>
                    </Icons>

                    <div className="status">
                      <span className="span">Availability: </span>
                      <p
                        className={
                          product.Stock < 1 ? "redColor" : "greenColor"
                        }
                      >
                        {product.Stock < 1 ? "Out Of Stock" : "In Stock"}
                      </p>
                    </div>
                    <hr />

                    <div className="detailsBlock-4">
                      <p>Quantity &nbsp;</p>
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly value={quantity} type="number" />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <hr className="hr" />

                    <div className="detailsBlock-5">
                      <ButtonFill
                        onClick={addToCartHandler}
                        disabled={product.Stock < 1 ? true : false}
                      >
                        {product.Stock < 1 ? "Out Of Stock" : "Add To Cart"}
                      </ButtonFill>
                      <Link to="https://forms.gle/my2D3uQH8Y4ZoTXp9">
                        <ButtonOutline>Custom Order</ButtonOutline>
                      </Link>
                    </div>
                  </div>
                </ProductDetail>
              </div>
              {/* Review Section */}
            </div>
          </Container>
        </Fragment>
      )}
      <hr className="hr" />

      {/* 
      //! Review Section  
      */}
      <ReviewContainer>
        <div className="heading-container">
          <h2 className="heading">{product.numOfReviews} Reviews</h2>
          <ButtonFill onClick={submitReviewToggle}>Write a Review</ButtonFill>
        </div>

        <Dialog
          className="dialog"
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
          style={{ width: "100vw", border: "2px solid red" }}
        >
          <DialogTitle
            className="dialogTitle"
            style={{ fontFamily: "Poppins" }}
          >
            Submit Review
          </DialogTitle>
          <DialogContent
            className="dialogContent"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
              style={{
                marginBottom: "1rem",
              }}
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                padding: "1rem",
                fontFamily: "Poppins",
                fontSize: "1rem",
              }}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler}>Submit</Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (
          <div className="noReviews">
            <p>No Reviews Yet</p>
          </div>
        )}
      </ReviewContainer>
    </Fragment>
  );
};

const Container = styled.div`
  .container {
    background-color: rgb(255, 255, 255);
    width: 100vw;
    height: 100vh;
    padding: 6vmax;
    box-sizing: border-box;
    display: flex;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
  }

  .slides {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;

    img {
      border: 2px solid red;
      width: 100%;
      padding: 0;
      transition: 0.2s ease-in-out;
      /* overflow: hidden; */
    }

    /* img:hover{
      width: 100%;
      overflow: visible;
      transform: scale(1.25);
    } */
  }

  @media screen and (max-width: 800px) {
    .container {
      width: 100vw;
      padding: 0;
      box-sizing: border-box;
      display: flex;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      width: 100vw;
      overflow: hidden;
    }

    .slides {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      box-sizing: border-box;

      img {
        width: 100vw;
        margin-bottom: 2rem;
      }
    }
  }
`;

const ProductDetail = styled.div`
  .detailsBlock-1 {
    padding: 5px 0;
    width: 50vw;
    font-family: Poppins;
    h1 {
      text-transform: capitalize;
    }
  }
  .detailsBlock-2 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    padding: 1vmax 0;
  }

  .detailsBlock-3 {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 70%;
    p {
      font: 500 1.2rem "Poppins";
    }
    h3 {
      color: rgba(17, 17, 17, 0.795);
      font: 500 1.2rem "Poppins";
      margin: 0.5vmax 0;
    }
  }

  .detailsBlock-4 {
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: flex-start;

    p {
      padding: 0.25vmax 0;
      font: 400 1rem "Poppins";
    }
    button {
      font-size: 1.2rem;
      border-radius: 30%;
      border: none;
      background: white;
      padding: 0.5vmax;
      cursor: pointer;
      transition: 0.2s ease-in-out;

      :hover {
        cursor: pointer;
        background: #45bfb8;
        color: white;
        transition: 0.2s ease-in-out;
      }
    }

    input {
      border: none;
      width: 2rem;
      text-align: center;
      outline: none;
      font: 400 1vmax "Poppins";
      color: rgba(0, 0, 0, 0.74);
    }

    input[type="number"] {
      text-align: center;
      border: none;
      user-select: none;
    }
  }

  .detailsBlock-5 {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px 10px;
    width: 25rem;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 0;

    .span {
      font-size: 1.2rem;
    }
    p {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 800px) {
    .hr {
      display: block;
    }

    hr {
      display: none;
    }
    .productDetails {
      padding: 0;
    }

    .detailsBlock-1 {
      padding: 1rem;
      text-align: center;
      width: 100vw;
      h1 {
        font-family: Poppins;
        text-transform: capitalize;
      }
    }

    .detailsBlock-2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0;
    }

    .detailsBlock-3 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      p {
        font: 500 1.2rem "Poppins";
      }
      h3 {
        color: rgba(17, 17, 17, 0.795);
        font: 500 1.2rem "Poppins";
        margin: 0.5vmax 0;
      }

      .hr {
        display: none;
      }
    }
    .status {
      display: flex;
      align-items: center;
      justify-content: center;

      .span {
        font-size: 1.2rem;
      }

      > p {
        font-size: 1.2rem;
      }
      padding: 10px 0;
    }
    .detailsBlock-4 {
      display: flex;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        /* padding: 0.25vmax 0; */
        font: 400 1.2rem "Poppins";
        /* border: 2px solid red; */
      }
      button {
        font-size: 1.2rem;
        padding: 1rem;
      }

      input {
        border: none;
        padding: 2rem;
        text-align: center;
        outline: none;
        font: 400 1.2rem "Poppins";
        color: rgba(0, 0, 0, 0.74);
      }

      input[type="number"] {
        padding: 1rem;
        text-align: center;
        border: none;
        user-select: none;
      }
    }

    .detailsBlock-5 {
      width: 100vw;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20vw;
  padding: 10px;

  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .style {
    background-color: #45bfb8;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .icon {
    color: white;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    padding: 10px;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .heading-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    margin-top: 2rem;
    width: 30vw;
    margin-bottom: 1.2rem;

    .heading {
      font-weight: 500;
      border-bottom: 1px solid #707070;
    }
  }

  .reviews {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.2rem;
    flex-direction: column;
  }

  .noReviews {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem;
    font-size: 1.1rem;
  }

  @media screen and (max-width: 800px) {
    .heading-container {
      width: 100vw;
    }
  }
`;

export default ProductDetails;
