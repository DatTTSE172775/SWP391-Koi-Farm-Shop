import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000/api/",
});

axiosPublic.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosPublic;
