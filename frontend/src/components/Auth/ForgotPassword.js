import React, { useState, useEffect } from "react";
import MailOutline from "@mui/icons-material/MailOutline";
import { forgotPassword } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS, CLEAR_MESSAGE } from "../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const { loading, error, message, success } = useSelector(
    (state) => state.user
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(message, { autoClose: 5000 });

      dispatch(CLEAR_ERRORS());
    }

    if (success) {
      dispatch(CLEAR_MESSAGE());
      toast.success(message);

      navigate("/login");
    }
  }, [dispatch, error, message, navigate, success]);

  return (
    <>
      <div className="auth-page page">
        <div className="forgot-password-box">
          <h2 className="auth-box-title">Forgot Password</h2>

          <form className="auth-form" onSubmit={forgotPasswordSubmit}>
            <div className="auth-email">
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="auth-btn" disabled={loading}>
              {loading && <ButtonLoader />} Send Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
