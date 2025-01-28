import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import "../Auth/styles.css";
import { getUser, logout, updateUser } from "../../redux/actions/userActions";
import { CLEAR_ERRORS, CLEAR_MESSAGE } from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated, message, user } = useSelector(
    (state) => state.user
  );

  const [data, setData] = useState(
    user || {
      name: "",
      email: "",
      password: "",
    }
  );

  const { name, email, password } = data;

  // handler functions
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleChange = (e) => {
    setData({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (error) {
      toast.error(message, { autoClose: 100 });
      dispatch(CLEAR_ERRORS());
    }

    if (message) {
      toast.success(message);
      dispatch(CLEAR_MESSAGE());
    }
    dispatch(getUser());
  }, [dispatch, error, isAuthenticated, message, navigate]);

  return (
    <>
      <div className="auth-page page">
        <div className="auth-box">
          <h2 className="auth-box-title">PROFILE</h2>

          <form className="auth-form" onSubmit={handleUpdate}>
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
              Update Profile
            </button>
          </form>
          <button
            className="logout-btn"
            disabled={loading}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
