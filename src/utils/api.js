import axios from "axios";
import { API } from "./constants";

const apiClient = axios.create({
  baseURL: API.BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    const { status, statusCode, message, data } = response.data;
    if (status === API.STATUS) {
      return { status, statusCode, message, data };
    } else {
      return Promise.reject({ status, statusCode, message });
    }
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token has expired or is invalid
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error.response.data);
  }
);

export const apiService = {
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, body) => apiClient.post(url, body),
  put: (url, body) => apiClient.put(url, body),
  delete: (url) => apiClient.delete(url),
};
