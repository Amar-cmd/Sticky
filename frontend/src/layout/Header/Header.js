import React, { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import "./HeaderStyle.css";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../../src/logo_black.png";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { links, icons } from "./HeaderData";
// import { MdAccountCircle } from "react-icons/md";

function Header() {
  const [keyword, setKeyword] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };


  const navigate = useNavigate();
  // const {cartItems} = useSelector((state) => state.cart)
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      console.log(keyword);
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (keyword.trim()) {
        console.log(keyword);
        navigate(`/products/${keyword}`);
      } else {
        navigate(`/products`);
      }
    }
  };

   useEffect(() => {
     const linksHeight = linksRef.current.getBoundingClientRect().height;
     if (showLinks) {
       linksContainerRef.current.style.height = `${linksHeight}px`;
     } else {
       linksContainerRef.current.style.height = "0px";
     }
   }, [showLinks]);
  
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} className="logo" alt="logo" />
          </Link>
          <div className="SearchBar">
            <input
              className="input"
              type="text"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && { searchSubmitHandler }}
              onKeyDown={handleKeyDown}
            />
            <button
              className="button_search"
              onClick={searchSubmitHandler}
              keypress={(e) => e.key === "Enter" && { searchSubmitHandler }}
            >
              <AiOutlineSearch className="search" />
            </button>
          </div>

          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {icons.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <Link to={url}>{icon}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
