import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const styles = {
  div: {
    width: "40%",
    height: "60vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    cursor: "pointer",
    padding: ".5rem",
    width: "200px",
    backgroundColor: "var(--accent)",
    color: "var(--white)",
    outline: "none",
    border: "none",
  },
};

const Payment = () => {
  const pay = async () => {
    const {
      data: { key },
    } = await axios.get("/api/payment/apikey");
    const {
      data: { order },
    } = await axios.post("/api/payment", { amount: 500 });

    // checkout
    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Perfect Fit",
      // description: "Test Transaction",
      //   image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "http://localhost:5000/api/payment/verify", //Callback URL for verifing transaction on the server.
      prefill: {
        name: "Anirudh Tantry",
        email: "anirudh@tantry.in",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      // "theme": {
      //     "color": "#3399cc"
      // },

      // for verifing transaction on client side only.
      handler: (response) => {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log(response);
        toast.success(response.razorpay_payment_id);
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();

    // handling payment verification errors on client side only.
    razorpay.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      console.log(response);
      toast.error(response.error.reason);
    });
  };
  return (
    <div style={styles.div}>
      <h3>Payment</h3>
      <button style={styles.button} onClick={pay}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
