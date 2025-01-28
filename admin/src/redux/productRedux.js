import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    total_products: 0,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.total_products = action.payload.total_products;
    },
    getProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //DELETE
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products.splice(
        state.products.findIndex(
          (item) => item.productId === action.payload.id
        ),
        1
      );
      state.message = action.payload.message;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //UPDATE
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
      state.message = action.payload.message;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //UPDATE
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    clearError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
