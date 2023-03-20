import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAllReviews,
  deleteReviews,
} from "../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from "react-router-dom";
import { DELETE_REVIEW_RESET } from "../constants/productConstants";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { ButtonFill } from "./ButtonFill";


function ProductReviews() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.review
    );

    const { error, reviews, loading } = useSelector(
      (state) => state.productReviews
    );

    const [productId, setProductId] = useState("");
  const [toggle, setToggle] = useState(false);

    const showSidebar = () => {
    setToggle((toggle) => !toggle);
  };

    const deleteReviewHandler = (reviewId) => {
      dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(getAllReviews(productId));
    };

    useEffect(() => {
      if (productId.length === 24) {
        dispatch(getAllReviews(productId));
      }
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }

      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearError());
      }

      if (isDeleted) {
        alert.success("Review Deleted Successfully");
        navigate("/admin/reviews");
        dispatch({ type: DELETE_REVIEW_RESET });
      }
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

  
  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comment", 
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
          return params.getValue(params.id, "rating") >= 3
            ? "greenColor"
            : "redColor";
        },
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

    const rows = [];

    reviews &&
      reviews.forEach((item) => {
        rows.push({
          id: item._id,
          rating: item.rating,
          comment: item.comment,
          user: item.name,
        });
      });

    
  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <Dashboard>
        <button className="menuToggleBtn" onClick={showSidebar}>
          <BiMenu />
        </button>
        {window.innerWidth <= 1000 ? toggle ? <Sidebar /> : null : <Sidebar />}

        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <ButtonFill
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </ButtonFill>
          </form>

          {reviews && reviews.length > 0 ? (
            <Box sx={{ height: "100vh", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </Box>
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
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

  .productReviewsContainer {
    width: 100%;
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    border-left: 1px solid rgba(0, 0, 0, 0.158);
    height: 100vh;
  }

  .productReviewsForm {
    width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 3vmax;
    background-color: white;
  }

  .productReviewsFormHeading {
    color: rgba(0, 0, 0, 0.733);
    font: 300 2rem "Poppins";
    text-align: center;
  }

  .productReviewsForm > div {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 2rem;
  }
  .productReviewsForm > div > input {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
  }

  .productReviewsForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  .productListTable {
    width: 100%;
    background-color: white;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
  }

  .productListTable div {
    font: 300 1vmax "Poppins";
    color: rgba(0, 0, 0, 0.678);
    border: none;
  }

  .productListTable a {
    color: rgba(0, 0, 0, 0.527);
    transition: all 0.5s;
  }

  .productListTable a:hover {
    color: #45bfb8;
  }

  .MuiDataGrid-columnHeader {
    background-color: #45bfb8;
    padding: 1vmax !important;
    border: 2px solid red;
    width: 100%;
  }

  .MuiDataGrid-columnHeader div {
    color: rgb(255, 255, 255);
    font: 500 1.1vmax "Poppins" !important;
  }

  .MuiDataGrid-iconSeparator {
    display: none !important;
  }

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;

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
    .productReviewsContainer {
      border-left: none;
      border-top: 1px solid rgba(0, 0, 0, 0.158);
    }
    .productReviewsForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .productReviewsForm > div > svg {
      font-size: 2.8vmax;
    }

    .productListTable {
      width: 190%;
      background-color: white;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
    }

    .productListTable div {
      font: 300 4vw "Poppins";
      border: none;
      border: 1px solid transparent;
    }

    .MuiDataGrid-columnHeader {
      padding: 10px !important;
    }

    .MuiDataGrid-columnHeader div {
      font: 500 5vw "Poppins" !important;
    }
  }
`;
export default ProductReviews;
