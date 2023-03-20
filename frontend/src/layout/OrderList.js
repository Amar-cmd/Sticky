import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "./MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteOrder, getAllOrders, clearErrors } from "../actions/orderAction";
import { DELETE_ORDER_RESET } from "../constants/orderConstants";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const [toggle, setToggle] = useState(false);

  const showSidebar = () => {
    setToggle((toggle) => !toggle);
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);


  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status", 
      minWidth: 350,
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
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
          <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <Dashboard>
        <button className="menuToggleBtn" onClick={showSidebar}>
          <BiMenu />
        </button>

        {window.innerWidth <= 1000 ? toggle ? <Sidebar /> : null : <Sidebar />}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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
        </div>
      </Dashboard>
    </Fragment>
  );
}

const Dashboard = styled.div`
  width: 100vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  position: absolute;
  height: 100vh;
  .menuToggleBtn {
    display: none;
  }

  .productListContainer {
    background-color: rgb(255, 255, 255);
    border-left: 1px solid rgba(0, 0, 0, 0.158);
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  #productListHeading {
    font: 400 2rem "Roboto";
    padding: 0.5vmax;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.637);
    transition: all 0.5s;
    margin: 2rem;
    text-align: center;
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
    /* border: 2px solid red; */
    width: 100%;
  }

  .MuiDataGrid-columnHeader div {
    color: rgb(255, 255, 255);
    font: 500 1.1vmax "Poppins" !important;
  }

  .MuiDataGrid-iconSeparator {
    display: none !important;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    .menuToggleBtn {
      display: block;
      padding: 2rem;
      font-size: 2rem;
      z-index: 111;
      background: #45bfb8;
      color: white;
      border: none;
      outline: none;
    }

    .myOrdersPage {
      padding: 0;
      height: 93vh;
    }

    #myOrdersHeading {
      font: 400 2.2vmax "Poppins";
    }

    .MuiDataGrid-viewport {
      max-width: 100%;
      overflow: visible;
    }

    .productListTable {
      width: 200%;
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
export default OrderList;
