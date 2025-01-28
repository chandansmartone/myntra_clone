import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { register } from "../../redux/actions/userActions";
import { CLEAR_ERRORS, CLEAR_MESSAGE } from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const signupSubmit = (e) => {
    e.preventDefault();
    
    dispatch(register(user));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(message, { autoClose: 5000 });
      dispatch(CLEAR_ERRORS());
    }

    if (isAuthenticated) {
      // toast.success(message);
      dispatch(CLEAR_MESSAGE());
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, message, navigate]);

  return (
    <>
      <div className="auth-page page">
        <div className="auth-box">
          <h2 className="auth-box-title">REGISTER</h2>

          <form className="auth-form" onSubmit={signupSubmit}>
            <div className="auth-name">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="auth-email">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="auth-password">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <button className="auth-btn" disabled={loading}>
              {loading && <ButtonLoader />} Create account
            </button>
          </form>
          <p className="auth-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
