import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";


function ResetPassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
      const { token } = useParams();


    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);

      dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }

      if (success) {
        alert.success("Password Updated Successfully");

        navigate("/login");
      }
    }, [dispatch, error, alert, navigate, success]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <ResetPasswordContainer>
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </ResetPasswordContainer>
        </Fragment>
      )}
    </Fragment>
  );
}

const ResetPasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(231, 231, 231); */
  position: fixed;
  top: 0%;
  left: 0;

  .resetPasswordBox {
    /* background-color: white; */
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
    width: 25vw;
    height: 70vh;
    box-sizing: border-box;
    overflow: hidden;
  }

  .resetPasswordHeading {
    text-align: center;
    color: rgba(0, 0, 0, 0.664);
    font: 400 1.3vmax "Poppins";
    padding: 1.3vmax;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    width: 50%;
    margin: auto;
  }

  .resetPasswordForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;
  }

  .resetPasswordForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .resetPasswordForm > div > input {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
  }

  .resetPasswordForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  .resetPasswordBtn {
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

  .resetPasswordBtn:hover {
    background-color: white;
    color: #45bfb8;
    border: 1px solid #45bfb8;
  }

  @media screen and (max-width: 600px) {
    .resetPasswordContainer {
      background-color: white;
    }
    .resetPasswordBox {
      width: 100vw;
      height: 95vh;
    }

    .resetPasswordForm {
      padding: 5vmax;
    }

    .resetPasswordForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .resetPasswordForm > div > svg {
      font-size: 2.8vmax;
    }

    .resetPasswordBtn {
      font: 300 1.9vmax "Poppins";
      padding: 1.8vmax;
    }
  }
`;
export default ResetPassword;
