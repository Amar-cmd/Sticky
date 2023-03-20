import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <>
      <section className="errorPage">
        <div className="errorPage__text">
          <h3>404</h3>
          <Link to="/">
            <span className="errorPage__button">Back to home</span>
          </Link>
          <Link to="/login">
            <span className="errorPage__button">Back to Login</span>
          </Link>
        </div>
        <span className="errorPage__templeweed-container">
          <img
            src="https://i.ibb.co/mTg87G2/tembleweed.png"
            className="errorPage__tembleweed"
            alt="404 Page Error. This Page does not exist. Either check your url or login again."
          />
        </span>
        <div className="errorPage__terrain"></div>
      </section>
    </>
  );
}

export default PageNotFound;
