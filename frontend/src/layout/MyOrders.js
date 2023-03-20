import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "@mui/x-data-grid";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../actions/orderAction";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Header from "./Header/Header";

function MyOrders() {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

 
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 350,
      flex: 1,
      
      
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      <Header/>
      {loading ? (
        <Loader />
      ) : (
        <MyOrdersPage>
          <Box sx={{ height: "100vh", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </Box>
        </MyOrdersPage>
      )}
    </Fragment>
  );
}

const MyOrdersPage = styled.div`
  width: 100vw;
  max-width: 100%;
  padding: 5vmax 6vmax;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .myOrdersTable {
    width: 100%;
    background-color: white;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
  }

  .myOrdersTable div {
    font: 300 1vmax "Poppins";
    color: rgba(0, 0, 0, 0.678);
    border: none;
  }

  .myOrdersTable a {
    color: rgba(0, 0, 0, 0.527);
    transition: all 0.5s;
  }

  .myOrdersTable a:hover {
    color: #45bfb8;
  }

  .MuiDataGrid-columnHeader {
    background-color: #45bfb8;
    padding: 1vmax !important;
    width: 100%;
  }

  .MuiDataGrid-columnHeader div {
    color: rgb(255, 255, 255);
    font: 500 1.1vmax "Poppins" !important;
  }

  .MuiDataGrid-iconSeparator {
    display: none !important;
  }

  @media screen and (max-width: 600px) {
    .myOrdersPage {
      padding: 0;
      height: 93vh;
    }

    #myOrdersHeading {
      font: 400 2.2vmax "Poppins";
      padding: 4vw;
    }

    .myOrdersTable div {
      font: 300 4vw "Poppins";
    }

    .MuiDataGrid-columnHeader {
      padding: 20px !important;
      width: 100%;
    }

    .MuiDataGrid-columnHeader div {
      font: 500 5vw "Poppins" !important;
    }
  }
`;

export default MyOrders;
