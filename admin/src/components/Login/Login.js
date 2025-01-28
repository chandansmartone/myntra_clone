import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { login } from "../../redux/apiCalls";
import { clear_errors, clear_message } from "../../redux/userRedux";
import "./styles.css";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(message, { autoClose: 5000 });

      dispatch(clear_errors());
    }

    if (isAuthenticated) {
      // toast.success(message);
      dispatch(clear_message());
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, message, navigate]);

  // console.log({ message, error, loading, isAuthenticated, history, location });
  return (
    <>
      <div className="auth-page">
        <div className="auth-box">
          <h2 className="auth-box-title">LOGIN</h2>

          <form className="auth-form" onSubmit={loginSubmit}>
            <div className="auth-email">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-password">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="auth-btn" disabled={loading}>
              {loading && <ButtonLoader />} Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
