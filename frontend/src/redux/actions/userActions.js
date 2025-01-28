import {
  REQUEST,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  ME,
  ERROR,
  FORGOT_SUCCESS,
  RESET_SUCCESS,
  USER_ERROR,
  UPDATE_SUCCESS,
  LOGOUT_SUCCESS,
} from "../reducers/userSlice";
import axios from "../../axiosConfig";

// REGISTER
export const register = (user) => async (dispatch) => {
  dispatch(REQUEST());

  const options = { headers: { "Content-Type": "application/json" } };
  try {
    let { data } = await axios.post(`/api/register`, user, options);
    dispatch(REGISTER_SUCCESS(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// LOGIN
export const login = (email, password) => async (dispatch) => {
  dispatch(REQUEST());

  const options = { headers: { "Content-Type": "application/json" } };
  try {
    let { data } = await axios.post(`/api/login`, { email, password }, options);
    dispatch(LOGIN_SUCCESS(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(REQUEST());

  const options = { headers: { "Content-Type": "application/json" } };
  try {
    let { data } = await axios.post(`/api/password/reset`, { email }, options);
    dispatch(FORGOT_SUCCESS(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// RESET PASSWORD
export const resetPassword =
  (id, password, confirmPassword) => async (dispatch) => {
    dispatch(REQUEST());

    const options = { headers: { "Content-Type": "application/json" } };
    try {
      let { data } = await axios.post(
        `/api/password/reset/${id}`,
        { password, confirmPassword },
        options
      );
      dispatch(RESET_SUCCESS(data));
    } catch (err) {
      dispatch(ERROR(err.response.data));
    }
  };

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/logout`);
    dispatch(LOGOUT_SUCCESS(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// ME
export const getUser = () => async (dispatch) => {
  dispatch(REQUEST());
  try {
    let { data } = await axios.get("/api/me");
    dispatch(ME(data));
  } catch (err) {
    dispatch(USER_ERROR(err.response.data));
  }
};

// UPDATE USER
export const updateUser = (user) => async (dispatch) => {
  dispatch(REQUEST());
  try {
    let { data } = await axios.put("/api/me", { ...user });
    dispatch(UPDATE_SUCCESS(data));
  } catch (err) {
    dispatch(USER_ERROR(err.response.data));
  }
};
