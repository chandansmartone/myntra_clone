import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default instance;
