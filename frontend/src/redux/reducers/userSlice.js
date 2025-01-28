import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    REQUEST: (state) => {
      state.loading = true;
    },
    ERROR: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    },
    USER_ERROR: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
      state.message = null;
      state.success = null;
    },
    CLEAR_MESSAGE: (state) => {
      state.message = null;
      state.success = null;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    REGISTER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    LOGOUT_SUCCESS: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      // state.message = action.payload.message;
    },
    FORGOT_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    RESET_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    ME: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    UPDATE_SUCCESS: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
  },
});

export const {
  REQUEST,
  ERROR,
  USER_ERROR,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  FORGOT_SUCCESS,
  RESET_SUCCESS,
  ME,
  UPDATE_SUCCESS,
} = userSlice.actions;
export default userSlice.reducer;
