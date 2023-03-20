import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert';
import { logout } from '../actions/userAction'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
function UserOptions({user}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        {icon: <ListAltIcon/>, name: "Orders", func:orders},
        {icon: <PersonIcon/>, name: "Profile", func:account},
        {icon: <ExitToAppIcon/>, name: "Logout", func:logoutUser},
    ]

    if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
    }

    function dashboard(){
        navigate("/admin/dashboard");
    }
    
    function orders(){
        navigate("/orders");
    }

    function account(){
        navigate("/account");
    }

    function logoutUser(){
        dispatch(logout())
        navigate("/")
      alert.success("Logout Successfully")
    }

  return (
    <Fragment>
      <Container>
        <SpeedDial
          ariaLabel="SpeedDial Tooltip"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          className="speedDial"
          open={open}
          icon={
            <img
              className="speedDialIcon"
              src={
                user.avatar.url
                  ? user.avatar.url
                  : "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
              }
              alt="Profile"
            />
          }
        >
          {options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
            />
          ))}
        </SpeedDial>
      </Container>
    </Fragment>
  );
}

const Container = styled.div`
  .speedDial {
    position: fixed;
    right: 3vmax;
    bottom: 3vmax;
  }

  .speedDialIcon {
    width: 56px;
    height: 56px;
    border-radius: 100%;
  }

  .MuiSpeedDialAction-fab {
    background-color: #45bfb8;
    color: white;

    :hover {
      color: #45bfb8;
      background-color: white;
    }
  }
`;
export default UserOptions
