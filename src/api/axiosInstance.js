import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-backend-828f.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
