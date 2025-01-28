import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../redux/actions/productActions";
import ProductNotFound from "../../assets/no_products.svg";
import "./style.css";

const Products = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const {
    products_per_page,
    total_products,
    products,
    error,
    loading,
    message,
  } = useSelector((state) => state.products);

  const handlePageChange = (event, page) => {
    setCurrentPageNo(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    dispatch(getAllProducts(location.state, currentPageNo));
  }, [location, currentPageNo, message, error, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="products-page page">
      <h1 className="productsHeading">PRODUCTS</h1>

      <div className="products">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

      {/* Pagination */}
      {products_per_page < total_products && (
        <div className="paginationBox">
          <Pagination
            page={currentPageNo}
            onChange={handlePageChange}
            color="primary"
            count={Math.floor(total_products / products_per_page)}
          />
        </div>
      )}

      {products?.length <= 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={ProductNotFound} alt="no_products" width={350} />
        </div>
      )}
    </div>
  );
};

export default Products;
