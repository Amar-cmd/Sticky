import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Home from "../src/layout/Home";
import ProductDetails from "./layout/Product/ProductDetails";
import StickersPage from "./layout/StickersPage";
import LoginSignUp from "./components/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./layout/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./layout/Profile";
import UpdateProfile from "./layout/UpdateProfile";
import UpdatePassword from "./layout/UpdatePassword";
import ForgotPassword from "./layout/ForgotPassword";
import ResetPassword from "./layout/ResetPassword";
import Cart from "./layout/Cart";
import Shipping from "./layout/Shipping";
import Order from "./layout/Order";
import axios from "axios";
import Payment from "./layout/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./layout/OrderSuccess";
import MyOrders from "./layout/MyOrders";
import OrderDetails from "./layout/OrderDetails";
import Dashboard from "./layout/Dashboard";
import ProductList from "./layout/ProductList";
import NewProduct from "./layout/NewProduct";
import UpdateProduct from "./layout/UpdateProduct";
import OrderList from "./layout/OrderList";
import ProcessOrder from "./layout/ProcessOrder";
import UsersList from "./layout/UsersList";
import UpdateUser from "./layout/UpdateUser";
import ProductReviews from "./layout/ProductReviews";
import PageNotFound from "./layout/Error/PageNotFound";
import AboutMe from "./layout/About/AboutMe";
import Contact from "./layout/Contact";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  // ! Loading Font from Google
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Roboto", "Open Sans"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {isAuthenticated && (
              <Route path="/process/payment" element={<Payment />} /> //Todo: Mobile Responsive not done
            )}
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<AboutMe />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<StickersPage />} />
        <Route path="/products/:keyword" element={<StickersPage />} />
        <Route path="/login" element={<LoginSignUp />} />
        {isAuthenticated && <Route path="/account" element={<Profile />} />}
        {isAuthenticated && (
          <Route path="/me/update" element={<UpdateProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/password/update" element={<UpdatePassword />} />
        )}
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        {isAuthenticated && (
          <Route path="/login/shipping" element={<Shipping />} />
        )}
        {isAuthenticated && <Route path="/order/confirm" element={<Order />} />}

        {isAuthenticated && (
          <Route path="/success" element={<OrderSuccess />} />
        )}
        {isAuthenticated && <Route path="/orders" element={<MyOrders />} />}
        {isAuthenticated && (
          <Route path="/order/:id" element={<OrderDetails />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/dashboard" element={<Dashboard />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/products" element={<ProductList />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/product" element={<NewProduct />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/orders" element={<OrderList />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/users" element={<UsersList />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        )}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/admin/reviews" element={<ProductReviews />} />
        )}
        <Route
          element={
            window.location.pathname === "/process/payment" ? null : (
              <PageNotFound />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
