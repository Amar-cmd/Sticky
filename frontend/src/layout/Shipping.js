import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../actions/cartAction";
import MetaData from "../layout/MetaData";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";

function Shipping() {

     const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
    const { shippingInfo } = useSelector((state) => state.cart);
    
     const [address, setAddress] = useState(shippingInfo.address);
     const [city, setCity] = useState(shippingInfo.city);
     const [state, setState] = useState(shippingInfo.state);
     const [country, setCountry] = useState(shippingInfo.country);
     const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    
     const shippingSubmit = (e) => {
       e.preventDefault();

       if (phoneNo.length < 10 || phoneNo.length > 10) {
         alert.error("Invalid Phone Number. It should be 10 digits long");
         return;
       }
       dispatch(
         saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
       );
       navigate("/order/confirm");
    };
    
  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <Header/>
      <CheckoutSteps activeStep={0} className="checkoutSteps"/>

      <ShippingContainer>
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </ShippingContainer>
    </Fragment>
  );
}

const ShippingContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .checkoutSteps {
    margin-top: 2vmax;
    border: 2px solid red;
  }
  .shippingBox {
    background-color: white;
    width: 25vw;
    height: 90vh;
    box-sizing: border-box;
    overflow: hidden;
  }

  .shippingHeading {
    text-align: center;
    color: rgba(0, 0, 0, 0.664);
    font: 400 1.3vmax "Poppins";
    padding: 1.3vmax;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    width: 50%;
    margin: auto;
  }

  .shippingForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    justify-content: space-evenly;
    height: 80%;
    transition: all 0.5s;
  }

  .shippingForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .shippingForm > div > input,
  .shippingForm > div > select {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
  }

  .shippingForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  .shippingBtn {
    border: none;
    background-color: #45bfb8;
    color: white;
    font: 300 1vmax "Poppins";
    width: 100%;
    padding: 1vmax;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;
    margin: 2vmax;
  }

  .shippingBtn:hover {
    background-color: white;
    border: 1px solid #45bfb8;
    color: #45bfb8;
  }

  @media screen and (max-width: 800px) {
    .shippingBox {
      width: 100vw;
      height: 95vh;
    }

    .shippingHeading {
      font: 400 6vw "Poppins";
      padding: 5vw;
    }

    .shippingForm {
      padding: 11vw;
    }

    .shippingForm > div > input,
    .shippingForm > div > select {
      padding: 5vw 10vw;
      font: 300 4vw Poppins;
    }

    .shippingForm > div > svg {
      font-size: 6vw;
      transform: translateX(3vw);
    }

    .shippingBtn {
      font: 300 4vw "Poppins";
      padding: 4vw;
    }
  }
`;
export default Shipping;
