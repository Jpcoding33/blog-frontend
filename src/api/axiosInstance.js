import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-backend-dyrz.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
