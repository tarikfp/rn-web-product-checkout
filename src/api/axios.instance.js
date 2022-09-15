import axios from "axios";

const BASE_URL = "http://localhost:9001";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
