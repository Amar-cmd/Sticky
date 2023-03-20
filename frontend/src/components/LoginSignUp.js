import React, { Fragment, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login, register } from "../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../layout/Header/Header";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <LoginSignupContainer>
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                <div className="loginEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot">Forget Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpEmail">
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpPassword">
                  <input
                    type="text"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Register"
                  className="signUpBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </LoginSignupContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

const LoginSignupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  left: 0;
  .LoginSignUpBox {
    border: 1px solid rgba(231, 231, 231, 0.7);
    width: 35vw;
    height: 70vh;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
  }

  .login_signUp_toggle {
    display: flex;
    height: 3vmax;
  }

  .login_signUp_toggle > p {
    color: rgba(0, 0, 0, 0.678);
    font: 300 1vmax "Roboto";
    transition: all 0.5s;
    cursor: pointer;
    display: grid;
    place-items: center;
    width: 100%;
  }

  .login_signUp_toggle > p:hover {
    color: #45bfb8;
  }

  .LoginSignUpBox > div > button {
    background-color: #45bfb8;
    height: 3px;
    width: 50%;
    border: none;
    transition: all 0.5s;
  }

  .loginForm,
  .signUpForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;
  }

  .signUpForm {
    transform: translateY(-100%) translateX(-100vmax);
  }

  .loginForm > div,
  .signUpForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .loginForm > div > input,
  .signUpForm > div > input {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax "Roboto";
    outline: none;
  }

  .loginForm > a {
    color: rgba(0, 0, 0, 0.651);
    text-decoration: none;
    align-self: flex-end;
    transition: all 0.5s;
    font: 500 0.8vmax Poppins;
  }

  .loginForm > a:hover {
    color: #45bfb8;
  }

  #registerImage > img {
    width: 3vmax;
    border-radius: 100%;
  }
  #registerImage > input {
    display: flex;
    padding: 0%;
  }

  #registerImage > input::file-selector-button {
    cursor: pointer;
    width: 100%;
    z-index: 2;
    height: 5vh;
    border: none;
    margin: 0%;
    font: 400 0.8vmax Poppins;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: #45bfb8;
    border: 0.5px solid #45bfb8;
    background-color: rgb(255, 255, 255);
  }

  #registerImage > input::file-selector-button:hover {
    background-color: #45bfb8;
    color: white;
  }
  .loginBtn,
  .signUpBtn {
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

  .loginBtn:hover,
  .signUpBtn:hover {
    background-color: white;
    border: 1px solid #45bfb8;
    color: #45bfb8;
  }

  .shiftToLeft {
    transform: translateX(-100%);
  }
  .shiftToNeutral {
    transform: translateX(0%);
  }

  .shiftToNeutralForm {
    transform: translateX(0%) translateY(-100%);
  }

  .shiftToRight {
    transform: translateX(100%);
  }

  @media screen and (max-width: 800px) {
    overflow: visible;
    .LoginSignUpContainer {
      background-color: white;
    }

    .LoginSignUpBox {
      width: 100vw;
      height: 95vh;
    }
    .login_signUp_toggle {
      height: 5vmax;
    }
    .login_signUp_toggle > p {
      font: 300 1.5vmax "Poppins";
    }

    .loginForm,
    .signUpForm {
      padding: 5vmax;
    }

    .loginForm > div > input,
    .signUpForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .loginForm > div > svg,
    .signUpForm > div > svg {
      font-size: 2.8vmax;
    }

    .loginForm > a {
      font: 500 1.8vmax Poppins;
    }

    #registerImage > img {
      width: 8vmax;
      border-radius: 100%;
    }

    #registerImage > input::file-selector-button {
      height: 7vh;
      font: 400 1.8vmax Poppins;
    }

    .loginBtn,
    .signUpBtn {
      font: 300 1.9vmax "Poppins";
      padding: 1.8vmax;
    }
  }
  @media screen and (max-width: 900px) {
    .LoginSignUpContainer {
      background-color: white;
    }

    .LoginSignUpBox {
      width: 100vw;
      height: 95vh;
    }
    .login_signUp_toggle {
      height: 5vmax;
    }
    .login_signUp_toggle > p {
      font: 300 1.5vmax "Poppins";
    }

    .loginForm,
    .signUpForm {
      padding: 5vmax;
    }

    .loginForm > div > input,
    .signUpForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .loginForm > div > svg,
    .signUpForm > div > svg {
      font-size: 2.8vmax;
    }

    .loginForm > a {
      font: 500 1.8vmax Poppins;
    }

    #registerImage > img {
      width: 8vmax;
      border-radius: 100%;
    }

    #registerImage > input::file-selector-button {
      height: 7vh;
      font: 400 1.8vmax Poppins;
    }

    .loginBtn,
    .signUpBtn {
      font: 300 1.9vmax "Poppins";
      padding: 1.8vmax;
    }
  }
`;
export default LoginSignUp;
