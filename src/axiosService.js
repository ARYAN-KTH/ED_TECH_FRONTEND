import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Replace with your backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for request (optional)
api.interceptors.request.use(
  (config) => {
    // You can add token authentication here if needed
    // Example: config.headers['Authorization'] = `Bearer ${yourToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptors for response (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., show notification for 401)
    return Promise.reject(error);
  }
);

export default api;
