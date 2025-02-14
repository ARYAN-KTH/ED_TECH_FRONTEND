import axios from "axios";

// Function to get the access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem("token");  // Token is stored in localStorage
};

// Function to get refresh token (assuming it's in cookies)
const getRefreshToken = () => {
  // We can access refresh token from cookies (server side sets it as httpOnly)
  return document.cookie.split(';').find(cookie => cookie.trim().startsWith('refreshToken='))?.split('=')[1] || null;
};

// Function to refresh the access token using refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post("http://localhost:3000/api/v1/refresh-token", null, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // This ensures cookies are sent with the request
    });

    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken); // Save the new access token
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;  // Throw the error to handle it later
  }
};

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Replace with your backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    // Get the access token
    let accessToken = getAccessToken();

    // If the access token exists, add it to the request headers
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (for handling expired tokens)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // If 401 error (Unauthorized), try to refresh the token
      try {
        const newAccessToken = await refreshAccessToken();

        // Retry the failed request with the new access token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);  // Retry the request with the new token
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // You can handle session expiration or redirect to login here
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

