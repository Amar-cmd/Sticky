import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstant";
import MetaData from "./MetaData";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header/Header";

function UpdatePassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    


    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);

      dispatch(updatePassword(myForm));
    };

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }

      if (isUpdated) {
        alert.success("Profile Updated Successfully");

        navigate("/account");

        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      <Header/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <UpdatePasswordContainer>
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </UpdatePasswordContainer>
        </Fragment>
      )}
    </Fragment>
  );
}

const UpdatePasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;

  .updatePasswordBox {
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
    width: 30vw;
    height: 70vh;
    box-sizing: border-box;
    overflow: hidden;
  }

  .updatePasswordHeading {
    text-align: center;
    color: rgba(0, 0, 0, 0.664);
    font: 400 1.3vmax "Poppins";
    padding: 1.3vmax;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    width: 50%;
    margin: auto;
  }

  .updatePasswordForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;
  }

  .updatePasswordForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .updatePasswordForm > div > input {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
  }

  .updatePasswordForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  .updatePasswordBtn {
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

  .updatePasswordBtn:hover {
    background-color: white;
    color: #45bfb8;
    border: 1px solid #45bfb8;
  }

  @media screen and (max-width: 800px) {
    .updatePasswordContainer {
      background-color: white;
    }
    .updatePasswordBox {
      width: 100vw;
      height: 95vh;
    }

    .updatePasswordForm {
      padding: 5vmax;
    }

    .updatePasswordForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .updatePasswordForm > div > svg {
      font-size: 2.8vmax;
    }

    .updatePasswordBtn {
      font: 300 1.9vmax "Poppins";
      padding: 1.8vmax;
    }
  }
`;

export default UpdatePassword;
