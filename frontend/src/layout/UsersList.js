import React, { Fragment, useEffect, useState } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllUsers, clearError, deleteUser } from "../actions/userAction";
import { DELETE_USER_RESET } from "../constants/userConstant";
import { useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

    const [toggle, setToggle] = useState(false);
  const showSidebar = () => {
    setToggle((toggle) => !toggle);
  };
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  
  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,

    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        console.log(params.id);
        return (
          <Fragment>
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });


  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <Dashboard>
      <button className="menuToggleBtn" onClick={showSidebar}>
        <BiMenu />
      </button>
      {window.innerWidth <= 1000 ? toggle ? <Sidebar /> : null : <Sidebar />}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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
  /* overflow-y: visible; */
  .menuToggleBtn {
    display: none;
  }

  .productListContainer {
    /* width: 100%; */
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
      height: 100vh;
    }

    #myOrdersHeading {
      font: 400 2.2vmax "Poppins";
    }

    .MuiDataGrid-viewport {
      width: 100%;
    }

    .productListTable div {
      font: 300 4vw "Poppins";
    }

    .MuiDataGrid-columnHeader {
      padding: 10px !important;
      width: 190%;
    }
    
    .MuiDataGrid-columnHeader div {
      font: 500 5vw "Poppins" !important;
    }
  }
`;
export default UsersList;
