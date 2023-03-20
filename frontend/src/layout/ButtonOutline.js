import styled from "styled-components";

export const ButtonOutline = styled.button`
  text-decoration: none;
  width: auto;
  border: 1px solid #45bfb8;
  background-color: transparent;
  color: #45bfb8;
  padding: 1rem 1rem;
  /* border: none; */
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  :hover {
    background-color: #45bfb8;
    color:white;
  }

  a {
    text-decoration: none;
    color: #45bfb8;
    font-size: 1rem;

  }
`;
