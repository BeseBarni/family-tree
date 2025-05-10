import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful (status code 2xx), return the response data
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code out of 2xx range
      const statusCode = error.response.status;
      const errorMessage = error.response.data.message || "An error occurred";

      // Handle different status codes accordingly
      if (statusCode === 401) {
        // Handle unauthorized error, for example by redirecting to login
        console.error("Unauthorized access - redirecting to login");
      } else if (statusCode === 500) {
        // Handle server errors
        console.error("Server error - try again later");
      } else {
        // Handle other types of errors
        console.error(`Error ${statusCode}: ${errorMessage}`);
      }
    } else if (error.request) {
      // No response received (network error, timeout, etc.)
      console.error("Network error - check your internet connection");
    } else {
      // Something else happened during the request
      console.error("Request error:", error.message);
    }

    // Optionally, return a rejected promise to ensure `.catch` is triggered in individual requests
    return Promise.reject(error);
  }
);
