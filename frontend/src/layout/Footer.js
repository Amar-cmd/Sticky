import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonFill } from "./ButtonFill";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { SiGmail } from "react-icons/si";


const Footer = () => {
  return (
    <>
      <Wrapper>
        <section className="contact-short">
          <div className="left_section">
            <div>
              <h3>Ready to get started?</h3>
              <h3>Explore Now</h3>
            </div>
          </div>

          <div>
            <Link to="/products">
              <ButtonFill className="right_section">Get Started</ButtonFill>
            </Link>
          </div>
        </section>

        {/* footer section */}

        <footer>
          <div className="footer_content">
            <div className="footer-about">
              <h3>Sticky</h3>
              <p>Keep The Child Within You Alive. </p>
            </div>

            <div className="footer-social">
              <div className="footer-social--icons">
                <div>
                  <SiGmail className="icons" />
                </div>
                <div>
                  <FaFacebookF className="icons" />
                </div>
                <div>
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaYoutube className="icons" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom--section">
            <hr />
            <div className="footer_bottom ">
              <p> Sticky @{new Date().getFullYear()}. All Rights Reserved</p>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .contact-short {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    max-width: 60vw;
    margin: auto;
    padding: 2rem 1rem;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(15px);
    border-radius: 1rem;
    transform: translateY(50%);

    .left_section {
      h3 {
        font-weight: 400;
        user-select: none;
      }
    }
  }

  footer {
    background-color: #45bfb8;
    .footer_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 4rem;
    }

    h3 {
      color: white;
      font-weight: 400;
      user-select: none;
    }
    p {
      color: white;
      user-select: none;
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid white;
        transition: 0.2s ease-in-out;

        :hover {
          border: 2px solid white;
          background: white;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          .icons {
            color: #45bfb8;
          }
        }

        .icons {
          color: white;
          font-size: 1.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-bottom--section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding-top: 30px;

    hr {
      margin-bottom: 2rem;
      color: white;
      height: 0.1px;
    }

    p {
      color: white;
      user-select: none;
    }

    .footer_bottom {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 60%;
      padding-bottom: 2rem;
    }
  }

  @media screen and (max-width: 800px) {
    .contact-short, .footer-about {
      display: none;
    }

    .footer-social{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;

    }
  }
`;

export default Footer;
