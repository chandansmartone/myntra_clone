import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    message: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    clear_errors: (state) => {
      state.error = false;
      state.message = null;
    },
    clear_message: (state) => {
      state.message = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  logoutSuccess,
  loginFailure,
  clear_errors,
  clear_message,
} = userSlice.actions;
export default userSlice.reducer;
