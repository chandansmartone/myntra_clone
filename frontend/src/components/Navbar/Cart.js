import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <Link to="/cart">
      <Badge badgeContent={cart?.quantity} color="primary" p={2}>
        <ShoppingBagOutlinedIcon sx={{ color: "var(--black)" }} />
      </Badge>
    </Link>
  );
};

export default Cart;
