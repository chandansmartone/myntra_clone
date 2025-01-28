import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EmptyCart from "../../assets/empty_cart.svg";
import "./style.css";
import {
  getCart,
  removeCart,
  updateCart,
} from "../../redux/actions/cartActions";
import { CLEAR_CART_ERRORS, EMPTY_CART } from "../../redux/reducers/cartSlice";
import { getUser } from "../../redux/actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState();

  const checkoutBtnHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (cart.cart_message === "Unauthorized! Please log in.") {
      dispatch(EMPTY_CART());
      dispatch(getUser());
    }
    if (cart.cart_message) {
      if (cart.cart_error) {
        toast.error(cart.cart_message);
        dispatch(CLEAR_CART_ERRORS());
      } else {
        toast.success(cart.cart_message, { autoClose: 50 });
        dispatch(CLEAR_CART_ERRORS());
      }
    }

    setSubtotal(() =>
      cart?.products?.reduce(
        (acc, product) => acc + product.quantity * product.product?.price,
        0
      )
    );
  }, [dispatch, cart]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // add
  const updateQuantityBtnHandler = (id, quantity, type) => {
    let newQuantity;
    if (type === "sub") {
      newQuantity = quantity - 1;
    } else {
      newQuantity = quantity + 1;
    }
    if (newQuantity === 0) {
      dispatch(removeCart(id));
      return;
    }
    dispatch(updateCart(id, newQuantity));
  };

  return (
    <div className="cart-page page">
      <h1>YOUR BAG</h1>
      <div className="cart-container">
        <div className="cart-items-container">
          {cart.products?.length > 0 &&
            cart.products.map(
              (product) =>
                product.product && (
                  <div key={product.product.productId} className="cart-item">
                    <div className="product-container">
                      <img
                        src={product.product?.displayImage}
                        alt={product.product.brand}
                      />
                      <div className="product-info">
                        <span className="product-name">
                          <b>Product:</b>{" "}
                          <Link to={`/${product.product.landingPageUrl}`}>
                            {product.product.additionalInfo}
                          </Link>
                        </span>
                        <span className="product-id">
                          <b>ID:</b> {product.product.productId}
                        </span>
                        {product.size && (
                          <span className="product-size">
                            <b>Size:</b> {product.size}
                          </span>
                        )}

                        {/* For Mobile */}
                        <div className="product-price-container-mobile">
                          <div className="product-quantity-container-mobile">
                            <Remove
                              sx={{ cursor: "pointer" }}
                              size="small"
                              onClick={() =>
                                updateQuantityBtnHandler(
                                  product._id,
                                  product.quantity,
                                  "sub"
                                )
                              }
                            />
                            <div className="product-quantity-mobile">
                              {product.quantity}
                            </div>
                            <Add
                              sx={{ cursor: "pointer" }}
                              size="small"
                              onClick={() =>
                                updateQuantityBtnHandler(
                                  product._id,
                                  product.quantity,
                                  "add"
                                )
                              }
                            />
                          </div>
                          <div className="product-price-mobile">
                            ₹{product.product.price * product.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-price-container">
                      <div className="product-quantity-container">
                        <Remove
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            updateQuantityBtnHandler(
                              product._id,
                              product.quantity,
                              "sub"
                            )
                          }
                        />
                        <div className="product-quantity">
                          {product.quantity}
                        </div>
                        <Add
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            updateQuantityBtnHandler(
                              product._id,
                              product.quantity,
                              "add"
                            )
                          }
                        />
                      </div>
                      <div className="product-price">
                        ₹ {product.product.price * product.quantity}
                      </div>
                    </div>
                  </div>
                )
            )}
          <hr />
        </div>
        {cart.products.length > 0 && (
          <div className="order-summary">
            <h2>ORDER SUMMARY</h2>
            <hr />
            <div className="order-summary-item">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="order-summary-item">
              <span>Estimated Shipping</span>
              <span>₹40</span>
            </div>
            <div className="order-summary-item">
              <span>Shipping Discount</span>
              <span>- ₹40</span>
            </div>
            <div className="order-summary-item total">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <button className="checkout-btn" onClick={checkoutBtnHandler}>
              CHECKOUT NOW
            </button>
          </div>
        )}
      </div>
      {cart.products.length <= 0 && (
        <div className="empty_cart">
          <img src={EmptyCart} alt="empty_cart" width={300} align="center" />
        </div>
      )}
    </div>
  );
};

export default Cart;
