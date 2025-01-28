import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";
import { Axios } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

// LOGIN
export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());

  const options = { headers: { "Content-Type": "application/json" } };
  try {
    let { data } = await Axios.post(
      `/admin/login`,
      { email, password },
      options
    );
    dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  const options = { headers: { "Content-Type": "application/json" } };
  try {
    let { data } = await Axios.post(`/logout`, {}, options);
    dispatch(logoutSuccess(data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const getProducts =
  (p = 1, l = 8) =>
  async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await Axios.get("/product", { params: { p, l } });
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure(err.response.data));
    }
  };
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const { data } = await Axios.delete(`/product/${id}`);
    dispatch(deleteProductSuccess({ id, ...data }));
  } catch (err) {
    dispatch(deleteProductFailure(err.response.data));
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const { data } = await Axios.put(`/product/${id}`, product);
    dispatch(updateProductSuccess({ id, ...data }));
  } catch (err) {
    dispatch(updateProductFailure(err.response.data));
  }
};
export const addProduct = (product) => async (dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await Axios.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure(err.response.data));
  
}}
