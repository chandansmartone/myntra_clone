import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    product: null,
    loading: false,
    error: false,
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
    CLEAR_ERRORS: (state) => {
      state.error = null;
      state.message = null;
      state.success = null;
    },
    CLEAR_MESSAGE: (state) => {
      state.message = null;
      state.success = null;
    },
    GET_ALL_PRODUCTS: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.total_products = action.payload.total_products;
      state.products_per_page = action.payload.products_per_page;
    },
    GET_PRODUCT_DETAILS: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.similar_products = action.payload.similar_products;
    },
  },
});

export const {
  REQUEST,
  ERROR,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAILS,
} = productSlice.actions;
export default productSlice.reducer;
