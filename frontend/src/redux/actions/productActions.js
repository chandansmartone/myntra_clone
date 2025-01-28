import {
  ERROR,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAILS,
  REQUEST,
} from "../reducers/productSlice";
import axios from "../../axiosConfig";

export const getAllProducts =
  (query = {}, p = 1) =>
  async (dispatch) => {
    dispatch(REQUEST());
    try {
      const { data } = await axios.get("/api/product", {
        params: { ...query, p },
      });
      dispatch(GET_ALL_PRODUCTS(data));
    } catch (err) {
      dispatch(ERROR(err.response.data));
    }
  };

export const getProductDetails = (productId) => async (dispatch) => {
  dispatch(REQUEST());
  try {
    const { data } = await axios.get(`/api/product/${productId}`);
    dispatch(GET_PRODUCT_DETAILS(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};
