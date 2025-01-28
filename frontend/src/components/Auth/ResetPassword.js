import React, { useState, useEffect } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS, CLEAR_MESSAGE } from "../../redux/reducers/userSlice";
import "./styles.css";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, message, success } = useSelector(
    (state) => state.user
  );

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(token, password, confirmPassword));
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
        <div className="auth-box">
          <h2 className="auth-box-title">Reset Password</h2>

          <form className="auth-form" onSubmit={resetPasswordSubmit}>
            <div className="auth-password">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth-password">
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="auth-btn" disabled={loading}>
              {loading && <ButtonLoader />} Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
