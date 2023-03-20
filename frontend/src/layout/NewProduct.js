import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createProduct } from "../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "./MetaData";
import { NEW_PRODUCT_RESET } from "../constants/productConstants";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import { BiMenu } from "react-icons/bi";
function NewProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [toggle, setToggle] = useState(false);

    const showSidebar = () => {
    setToggle((toggle) => !toggle);
  };

  const categories = [
    "Assassin's Creed",
    "A Plague Tale",
    "Call Of Duty",
    "Detroit Become Human",
    "Forza Horizon",
    "God Of War",
    "Marvel's Avengers",
    "Red Dead Redemption",
    "Tomb Raider",
    "Uncharted",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("quantity", quantity);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Create Product" />
            <Dashboard>
              <button className="menuToggleBtn" onClick={showSidebar}>
        <BiMenu />
      </button>
      {window.innerWidth <= 1000 ? toggle ? <Sidebar /> : null : <Sidebar />}
            {/* <SideBar /> */}
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <h1>Create Product</h1>

                <div>
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  ></input>
                </div>

                <div>
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                      accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                  />
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Create
                </Button>
              </form>
            </div>
          </Dashboard>
        </Fragment>
      )}
    </Fragment>
  );
}

const Dashboard = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  position: absolute;
  background: #f5f6fb;
  overflow: hidden;

    .menuToggleBtn {
    display: none;
  }

  .newProductContainer {
    width: 100%;
    box-sizing: border-box;
    border-left: 1px solid rgba(0, 0, 0, 0.158);
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .newProductContainer h1 {
    color: rgba(0, 0, 0, 0.733);
    font: 300 2rem "Poppins";
    text-align: center;
  }

  .createProductForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 3vmax;
    justify-content: space-evenly;
    height: 70%;
    width: 40vh;
    background-color: white;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
  }

  .createProductForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .createProductForm > div > input,
  .createProductForm > div > select {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax Poppins;
    outline: none;
  }

  .createProductForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  #createProductFormFile > input {
    display: flex;
    padding: 0%;
  }

  #createProductFormFile > input::file-selector-button {
    cursor: pointer;
    width: 100%;
    z-index: 2;
    height: 5vh;
    border: 1px solid #45bfb8;
    margin: 0%;
    font: 400 0.8vmax Poppins;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: #45bfb8;
    background-color: rgb(255, 255, 255);
  }

  #createProductFormFile > input::file-selector-button:hover {
    background-color: #45bfb8;
    color: white;
  }

  #createProductFormImage {
    width: 100%;
    overflow: auto;
  }

  #createProductFormImage > img {
    width: 3vmax;
    margin: 0 0.5vmax;
    overflow-x: visible;
  }
  #createProductBtn {
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

  #createProductBtn:hover {
    background-color: white;
    color: #45bfb8;
    border: 1px solid #45bfb8;
  }

  @media screen and (max-width: 1000px) {
    width: 100vh;
    grid-template-columns: none;

    .menuToggleBtn {
      display: block;
      padding: 2rem 0;
      font-size: 2rem;
      z-index: 111;
      background: #45bfb8;
      color: white;
      border: none;
      outline: none;
    }
    
    
    .newProductContainer {
      background-color: rgb(255, 255, 255);
    }
    .createProductForm {
      padding: 5vmax;
    }

    .createProductForm > div > input,
    .createProductForm > div > select,
    .createProductForm > div > textarea {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax Poppins;
    }

    .createProductForm > div > svg {
      font-size: 2.8vmax;
    }

    #createProductFormFile > img {
      width: 8vmax;
      border-radius: 100%;
      overflow-x: visible;
    }

    #createProductFormFile > input::file-selector-button {
      height: 7vh;
      font: 400 1.8vmax Poppins;
    }

    #createProductBtn {
      font: 300 1.9vmax "Poppins";
      padding: 1.8vmax;
    }
  }
`;
export default NewProduct;
