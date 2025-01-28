import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    cart_message: null,
    cart_error: false,
    shippingInfo: {},
  },
  reducers: {
    REQUEST: (state) => {
      state.loading = true;
    },
    ERROR: (state, action) => {
      state.cart_message = action.payload.message;
      state.cart_error = true;
    },
    CLEAR_CART_ERRORS: (state) => {
      state.cart_error = null;
      state.cart_message = null;
    },
    ADD_TO_CART: (state, action) => {
      state.quantity = action.payload.quantity;
      state.cart_message = action.payload.message;
    },
    GET_CART_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload.cart?.cartItems;
      state.quantity = action.payload.cart?.cartItems?.length;
      if (action.payload.cart === null) {
        state.products = [];
        state.quantity = 0;
      }
    },
    UPDATE_CART: (state, action) => {
      state.products = action.payload.cart.cartItems;
      state.cart_message = action.payload.message;
    },
    DELETE_CART: (state, action) => {
      state.cart_message = action.payload.message;
      state.products = action.payload.cart.cartItems;
      state.quantity = action.payload.cart?.cartItems?.length;
    },
    EMPTY_CART: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    SAVE_SHIPPING_INFO: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
});

export const {
  REQUEST,
  ERROR,
  CLEAR_CART_ERRORS,
  ADD_TO_CART,
  GET_CART_SUCCESS,
  UPDATE_CART,
  DELETE_CART,
  SAVE_SHIPPING_INFO,
  EMPTY_CART,
} = cartSlice.actions;
export default cartSlice.reducer;
