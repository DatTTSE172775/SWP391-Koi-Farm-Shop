import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000/api/",
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Handle token refresh or logout here
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;

