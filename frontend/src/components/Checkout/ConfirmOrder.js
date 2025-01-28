import React from "react";
import CheckoutSteps from "../Checkout/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";
import { emptyCart } from "../../redux/actions/cartActions";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, total, products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = products.reduce(
    (acc, product) => acc + product.quantity * product.product.price,
    0
  );

  const shippingCharges = 40;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  // Pay btn click handler
  const pay = async () => {
    // Razorpay create order
    const {
      data: { key },
    } = await axios.get("/api/payment/apikey");
    const {
      data: { order },
    } = await axios.post("/api/payment", { amount: subtotal });

    // checkout
    const options = {
      key: key, // the Key ID generated from the Razorpay Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Perfect Fit",
      order_id: order.id,
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phone,
      },
      notes: {
        address: address,
      },

      // for verifing transaction on client side only.
      handler: async (response) => {
        try {
          await axios.post("/api/payment/verify", response);

          // creating order after payment success
          const productsData = products.map((product) => {
            return { product: product.product._id, quantity: product.quantity };
          });
          const orderData = {
            products: productsData,
            amount: subtotal,
            address: shippingInfo,
            status: "ordered",
            paymentStatus: "paid",
            ...response,
          };
          await axios.post("/api/order", orderData);
          // toast.success(createOrder.data.message);

          //Clear cart
          dispatch(emptyCart());
          //navigate to orders page
          navigate("/order/success", { replace: true });
        } catch (err) {
          toast.error(err.response.message);
        }
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();

    // handling payment verification errors on client side only.
    razorpay.on("payment.failed", function (response) {
      toast.error(response.error.reason);
    });
  };

  return (
    <>
      <CheckoutSteps activeStep={1} />
      <div className="confirm-order-page">
        <div className="confirm-order-container">
          {/* address  */}
          <div className="confirm-shipping-info-container">
            <h3>Your Shipping Info:</h3>
            <div className="confirm-shipping-info">
              <span>
                <b>Name:</b> {user?.name}
              </span>
              <span>
                <b>Phone Number:</b> {shippingInfo.phone}
              </span>
              <span>
                <b>Address:</b> {address}
              </span>
            </div>
          </div>
          {/* cart */}
          <div className="confirm-cart-items">
            <h3>Your Cart Items:</h3>
            <div className="cart-items-container">
              {products.map((product) => (
                <div key={product.product.productId} className="cart-item">
                  <div className="product-container-order-page">
                    <img
                      src={product.product.displayImage}
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
                      <span className="product-quantityy">
                        <b>Quantity:</b> {product.quantity}
                      </span>
                      <span className="product-pricee">
                        <b>Price:</b> ₹
                        {product.product.price * product.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>ORDER SUMMARY</h2>
          <hr />
          <div className="order-summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="order-summary-item">
            <span>Estimated Shipping</span>
            <span>₹{shippingCharges}</span>
          </div>
          <div className="order-summary-item">
            <span>Shipping Discount</span>
            <span>- ₹{shippingCharges}</span>
          </div>
          <div className="order-summary-item total">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
          <button className="checkout-btn" onClick={pay}>
            PAY ₹{subtotal}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
