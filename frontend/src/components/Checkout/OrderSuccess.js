import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      {/* <Link to="/orders">View Orders</Link> */}
      <Link to="/">Back To Home</Link>
    </div>
  );
};

export default OrderSuccess;
