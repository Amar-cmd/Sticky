import styled from "styled-components";
import Header from "./Header/Header";
import img from "../contact.png";
import MetaData from "./MetaData";
import { ButtonFill } from "./ButtonFill";
const Contact = () => {
  return (
    <Wrapper>
      <MetaData title="Contact Me" />
      <Header />
      <h2 className="common-heading">Contact page</h2>

      <div className="container">
        <img src={img} alt="Contact ME" />
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xoqzqzlq"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="on"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="on"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"
            ></textarea>

            <ButtonFill
              style={{ width: "200px", justifyContent: "center" }}
              className="btn"
              type="submit"
            >
              Send
            </ButtonFill>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .common-heading {
    padding: 4rem 0;
    text-align: center;
    font-size: 3rem;
    font-family: Poppins;
    text-transform: capitalize;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    img {
      width: 50%;
    }

    .contact-form {
      width: 100%;
      max-width: 50rem;
      margin: auto;

      input,
      textarea {
        font-family: Poppins;
        margin-bottom: 2rem;
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.8rem;
        border-radius: 10px;
        border: 1px solid #45bfb8;

        width: 80%;

        ::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: #45bfb8;
          opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #45bfb8;
        }

        ::-ms-input-placeholder {
          /* Microsoft Edge */
          color: #45bfb8;
        }
        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: white;
            border: 1px solid red;
            color: red;
            transform: scale(0.9);
          }
        }

        .btn {
          border: 2px solid red;
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
      .common-heading {
    padding: 2rem 0;
    font-size: 2rem;
  }

    .container {
        margin-bottom: 2rem;
      flex-direction: column;
      margin-top: 0;

      img{
        width: 100%;
      }
      .contact-inputs {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }
`;

export default Contact;
