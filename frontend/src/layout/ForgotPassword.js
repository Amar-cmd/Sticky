import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import styled from "styled-components";
import Header from "./Header/Header";


function ForgotPassword() {

     const dispatch = useDispatch();
     const alert = useAlert();

     const { error, message, loading } = useSelector(
       (state) => state.forgotPassword
     );

     const [email, setEmail] = useState("");

     const forgotPasswordSubmit = (e) => {
       e.preventDefault();

       const myForm = new FormData();

       myForm.set("email", email);
       dispatch(forgotPassword(myForm));
     };

     useEffect(() => {
       if (error) {
         alert.error(error);
         dispatch(clearError());
       }

       if (message) {
         alert.success(message);
       }
     }, [dispatch, error, alert, message]);


  return (
    <Fragment>
      <Header/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <ForgotPasswordContainer>
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </ForgotPasswordContainer>
        </Fragment>
      )}
    </Fragment>
  );
}

const ForgotPasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  /* max-width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(231, 231, 231); */
  /* position: fixed; */
  /* top: 0%; */
  left: 0;

  .forgotPasswordBox {
    /* background-color: white; */
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
    width: 30vw;
    height: 40vh;
    box-sizing: border-box;
    overflow: hidden;
  }

  .forgotPasswordHeading {
    text-align: center;
    color: rgba(0, 0, 0, 0.664);
    font: 400 1.3vmax "Poppins";
    padding: 1.3vmax;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    width: 50%;
    margin: auto;
  }

  .forgotPasswordForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;
  }

  .forgotPasswordForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .forgotPasswordForm > div > input {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
  }

  .forgotPasswordForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  .forgotPasswordBtn {
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

  .forgotPasswordBtn:hover {
    background-color: white;
    color: #45bfb8;
    border: 1px solid #45bfb8;
  }

  @media screen and (max-width: 800px) {
    .forgotPasswordContainer {
      background-color: white;
    }
    .forgotPasswordBox {
      width: 100vw;
      height: 95vh;
    }

    .forgotPasswordForm {
      padding: 5vmax;
    }

    .forgotPasswordForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .forgotPasswordForm > div > svg {
      font-size: 2.8vmax;
    }

    .forgotPasswordBtn {
      font: 300 1.9vmax "Poppins";
      padding: 1.8vmax;
    }
  }
`;
export default ForgotPassword
