import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000/api-docs/",
});

axiosPublic.interceptors.request.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosPublic;
