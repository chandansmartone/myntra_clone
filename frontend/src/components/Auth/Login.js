import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { login, getUser } from "../../redux/actions/userActions";
import { getCart } from "../../redux/actions/cartActions";
import { CLEAR_ERRORS, CLEAR_MESSAGE } from "../../redux/reducers/userSlice";
import "./styles.css";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";

const Login = () => {
  const location = useLocation();
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

  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";

  useEffect(() => {
    if (error) {
      toast.error(message, { autoClose: 5000 });

      dispatch(CLEAR_ERRORS());
    }

    if (isAuthenticated) {
      // toast.success(message);
      dispatch(CLEAR_MESSAGE());
      dispatch(getUser());
      dispatch(getCart());

      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, message, navigate, redirect]);

  // console.log({ message, error, loading, isAuthenticated, history, location });
  return (
    <>
      <div className="auth-page page">
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
            <Link to="/password/forgot">Forget Password ?</Link>

            <button className="auth-btn" disabled={loading}>
              {loading && <ButtonLoader />} Login
            </button>
          </form>
          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
