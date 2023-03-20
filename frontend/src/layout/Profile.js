import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import MetaData from "./MetaData";
import { ButtonOutline } from "./ButtonOutline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}`} />
          {/* <Header /> */}
          <ProfileContainer>
            <div className="left">
              <div className="photo">
                <div className="shape"></div>
                <img src={user.avatar.url} alt={user.name} />
              </div>
            </div>

            <div className="right">
              <div className="details">
                <div className="name">
                  <h2 className="username">{user.name}</h2>
                </div>
                <div className="email">
                  <h2>Email</h2>
                  <p>{user.email}</p>
                </div>
                <div className="joined">
                  <h2>Joined On</h2>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>

                <div className="buttons">
                  <Link to="/me/update">
                    <ButtonOutline>Edit Profile</ButtonOutline>
                  </Link>
                  <Link to="/password/update">
                    <ButtonOutline>Change Password</ButtonOutline>
                  </Link>
                  <Link to="/">
                    <ButtonOutline>Home</ButtonOutline>
                  </Link>
                </div>
              </div>
            </div>
          </ProfileContainer>
        </Fragment>
      )}
    </Fragment>
  );
}

const ProfileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .left {
    width: 50vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .shape {
    width: 28vmax;
    height: 28vmax;
    background: #45bfb8;
    position: absolute;
    z-index: -111;
    transform: rotateZ(45deg);
  }

  img {
    width: 28vmax;
    height: 28vmax;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }

  button {
    margin: 10px 0;
    width: 200px;
  }

  .right {
    width: 50vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .details {
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
    padding: 5rem 4rem;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
  }

  .name,
  .email,
  .joined {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;

    h2,
    p {
      height: auto;
      padding: 1rem;
    }
  }

  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 50%;
    background: black;
    overflow: hidden;

    .left {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 0;
    }

    .photo {
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .shape {
      display: none;
    }

    img {
      background-size: auto;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-clip: content-box;
      -webkit-mask-image: linear-gradient(black, transparent);
      mask-image: linear-gradient(black, transparent);
    }

    .buttons {
      display: flex;
      padding: 0;
      flex-direction: column;
      justify-content: center;
      width: 100vw;
      height: 100%;
      padding: 2rem 0;
    }

    button {
      margin: 5px;
      padding-bottom: 1rem;
      position: relative;
      bottom: 0;
      width: 200px;
      height: 100%;
    }

    .right {
      width: 100vw;
      height: 100%;
      position: relative;
      text-align: center;
      overflow: hidden;
    }

    .details {
      width: 100vw;
      /* height: 100vh; */
      height: 100%;
      padding: 0;
      display: flex;
      /* align-items: center; */
      justify-content: center;
      flex-direction: column;
      margin: -1rem;
    }

    .name,
    .email,
    .joined {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 100vw;
      height: 100%;
      flex-grow: 0;
      grid-template-columns: 1fr 1fr;

      > p {
        color: white;
        font-family: Poppins;
      }

      > h2 {
        font-family: Poppins;
        color: white;
      }

      .username {
        font-size: 3rem;
      }
    }
  }
`;
export default Profile;
