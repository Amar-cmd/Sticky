import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../constants/userConstant";
import MetaData from "./MetaData";
import Header from "./Header/Header";

function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);
  return (
    <Fragment>
      <Header/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Edit Profile" />
          <UpdateProfileContainer>
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Edit Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </UpdateProfileContainer>
        </Fragment>
      )}
    </Fragment>
  );
}

const UpdateProfileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  /* max-width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(231, 231, 231); */
  /* position: fixed; */
  top: 0%;
  left: 0;

  .updateProfileBox {
    /* background-color: white; */
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
    width: 30vw;
    height: 70vh;
    box-sizing: border-box;
    overflow: hidden;
  }

  .updateProfileHeading {
    text-align: center;
    color: rgba(0, 0, 0, 0.664);
    font: 400 1.3vmax "Poppins";
    padding: 1.3vmax;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    width: 50%;
    margin: auto;
  }

  .updateProfileForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;
  }

  .updateProfileForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .updateProfileForm > div > input {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
  }

  .updateProfileForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  #updateProfileImage > img {
    width: 3vmax;
    height: 50%;
    border-radius: 100%;
    margin: 1vmax;
  }
  #updateProfileImage > input {
    display: flex;
    padding: 0%;
  }

  #updateProfileImage > input::file-selector-button {
    cursor: pointer;
    width: 100%;
    z-index: 2;
    height: 5vh;
    border: none;
    margin: 0%;
    font: 400 0.8vmax Poppins;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: rgba(0, 0, 0, 0.623);
    background-color: rgb(255, 255, 255);
  }

  #updateProfileImage > input::file-selector-button:hover {
    background-color: rgb(235, 235, 235);
  }

  .updateProfileBtn {
    border: none;
    background-color: #45bfb8;
    color: white;
    font: 300 0.9vmax "Poppins";
    width: 100%;
    padding: 0.8vmax;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
  }

  .updateProfileBtn:hover {
    background-color: white;
    color: #45bfb8;
    border: 1px solid #45bfb8;
  }

  @media screen and (max-width: 800px) {
    .updateProfileContainer {
      background-color: white;
    }
    .updateProfileBox {
      width: 100vw;
      height: 95vh;
    }

    .updateProfileForm {
      padding: 5vmax;
    }

    .updateProfileForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .updateProfileForm > div > svg {
      font-size: 2.8vmax;
    }

    #updateProfileImage > img {
      width: 8vmax;
      height:50%;
      border-radius: 100%;
    }

    #updateProfileImage > input::file-selector-button {
      height: 7vh;
      font: 400 1.8vmax Poppins;
    }

    .updateProfileBtn {
      font: 300 1.9vmax "Poppins";
      padding: 1.8vmax;
    }
  }
`;
export default UpdateProfile;
