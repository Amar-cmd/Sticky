import React from "react";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import styled from "styled-components";
import logo from "../../src/logo_white.png"


function Sidebar() {
  return (
    <SidebarContainer>
      <Link to="/">
        <img className="icon" src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </SidebarContainer>

    // <SidebarContainer>
    //   <Link to="/">
    //     <img src={logo} alt="Ecommerce" />
    //   </Link>
    //   <Link to="/admin/dashboard">
    //     <p>
    //       <DashboardIcon /> Dashboard
    //     </p>
    //   </Link>
    //   <Link>
    //     <TreeView
    //       defaultCollapseIcon={<ExpandMoreIcon />}
    //       defaultExpandIcon={<ImportExportIcon />}
    //     >
    //       <TreeItem nodeId="1" label="Products">
    //         <Link to="/admin/products">
    //           <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
    //         </Link>

    //         <Link to="/admin/product">
    //           <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
    //         </Link>
    //       </TreeItem>
    //     </TreeView>
    //   </Link>
    //   <Link to="/admin/orders">
    //     <p>
    //       <ListAltIcon />
    //       Orders
    //     </p>
    //   </Link>
    //   <Link to="/admin/users">
    //     <p>
    //       <PeopleIcon /> Users
    //     </p>
    //   </Link>
    //   <Link to="/admin/reviews">
    //     <p>
    //       <RateReviewIcon />
    //       Reviews
    //     </p>
    //   </Link>
    // </SidebarContainer>
  );
}

// const SidebarContainer = styled.div`
//   background-color: #263443;
//   display: flex;
//   flex-direction: column;
//   padding: 4rem 0;
//   height: 100%;

//   @media screen and (max-width: 800px){
//     display: block;
//   }
  
//   a {
//     text-decoration: none;
//     color: #91a4b3;
//     font: 200 1rem "Poppins";
//     padding: 2rem;
//     transition: all 0.5s;
//   }
//   a:hover {
//     color: white;
//     transform: scale(1.1);
//   }

//   a > P {
//     display: flex;
//     align-items: center;
//   }
//   a > p > svg {
//     margin-right: 0.5rem;
//   }

//   .MuiTypography-root {
//     background-color: #263443 !important;
//   }
// `;

const SidebarContainer = styled.div`
  background-color: #263443;
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
  align-items: center;
  justify-content: center;

  > a:first-child {
    padding: 0;
  }
  > a > img {
    width: 100%;
    transition: all 0.5s;
  }

  a {
    text-decoration: none;
    color: #91a4b3;
    font: 200 1rem "Roboto";
    padding: 2rem;
    transition: all 0.5s;
  }
  a:hover {
    color: #45bfb8;
    transform: scale(1.1);
  }

  a > P {
    display: flex;
    align-items: center;
  }
  a > p > svg {
    margin-right: 0.5rem;
  }

  .MuiTypography-root {
    background-color: #263443 !important;
  }

  @media screen and (max-width: 1000px) {
    height: 100vh;
    padding: 0;
  }
`;
export default Sidebar;
