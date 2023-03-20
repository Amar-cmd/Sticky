import styled from "styled-components";

export const ButtonFill = styled.button`
  text-decoration: none;
  max-width: auto;
  background-color: #45bfb8;
  color: white;
  padding: 1rem 1rem;
  border: 1px solid #45bfb8;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  font-family: Poppins;

  :hover {
    background-color: white;
    color: #45bfb8;
  }

  :visited{
    color:white
  }

  a {
    text-decoration: none;
    font-size: 1rem;
    color:white
  }
`;
