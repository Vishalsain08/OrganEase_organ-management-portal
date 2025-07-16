// src/api/axios.js
import axios from 'axios';

// ✅ Use environment variable from .env (VITE_API_BASE_URL)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
   // Optional: include cookies for protected routes
});

// 🔐 Automatically attach token to each request if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Optional: Handle global error responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized. Redirect to login or show error.');
      // Example: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
