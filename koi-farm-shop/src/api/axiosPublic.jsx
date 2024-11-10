import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000/api/", // Đảm bảo `baseURL` chính xác
});

axiosPublic.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosPublic;
