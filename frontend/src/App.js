import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// route imports
import Header from "./components/Navbar/Header";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Checkout/Shipping";
import ConfirmOrder from "./components/Checkout/ConfirmOrder";
import Payment from "./components/Test/Payment";
import OrderSuccess from "./components/Checkout/OrderSuccess";
import Profile from "./components/User/Profile";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/account" element={<Profile />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/:category" element={<Products />} />
          <Route
            path="/:category/:brand/:name/:productId/buy"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </>
  );
}

export default App;
