import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import UserList from "./components/User/UserList";
import User from "./components/User/User";
import ProductList from "./components/Product/ProductList";
import Product from "./components/Product/Product";
import NewProduct from "./components/Product/NewProduct";
import Login from "./components/Login/Login";
import PrivateRoute from "./Route/PrivateRoute";
import "./App.css";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderList from "./components/Order/OrderList";
import Order from "./components/Order/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/product/add" element={<NewProduct />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:orderId" element={<Order />} />
        </Route>
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
  );
}

export default App;
