// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your backend URL or use VITE_API_URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Automatically attach token to each request if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Optional: Handle global error responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Example: Handle 401 (unauthorized)
      if (error.response.status === 401) {
        console.warn('Unauthorized. Redirect to login or show error.');
        // Optionally redirect or show toast here
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
