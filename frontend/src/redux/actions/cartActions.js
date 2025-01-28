import {
  ADD_TO_CART,
  GET_CART_SUCCESS,
  REQUEST,
  ERROR,
  UPDATE_CART,
  DELETE_CART,
} from "../reducers/cartSlice";
import axios from "../../axiosConfig";

// add to cart
export const addToCart = (product) => async (dispatch) => {
  const options = { headers: { "Content-Type": "application/json" } };
  try {
    const { data } = await axios.post("/api/cart", { product }, options);
    dispatch(ADD_TO_CART(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// Get cartItems
export const getCart = () => async (dispatch) => {
  dispatch(REQUEST());
  try {
    const { data } = await axios.get(`/api/cart`);
    dispatch(GET_CART_SUCCESS(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// Update cartItem
export const updateCart = (id, quantity) => async (dispatch) => {
  dispatch(REQUEST());
  try {
    const { data } = await axios.put(
      `/api/cart/update`,
      { id, quantity },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch(UPDATE_CART(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// Delete cartItems
export const removeCart = (id) => async (dispatch) => {
  dispatch(REQUEST());
  try {
    const { data } = await axios.put(
      `/api/cart/delete`,
      { id },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch(DELETE_CART(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};

// Empty cart
export const emptyCart = (id) => async (dispatch) => {
  dispatch(REQUEST());
  try {
    const { data } = await axios.delete(
      `/api/cart/empty`
    );
    dispatch(GET_CART_SUCCESS(data));
  } catch (err) {
    dispatch(ERROR(err.response.data));
  }
};
