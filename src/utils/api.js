import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("authToken");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMjU0Njc2MCwiZXhwIjoxNzMyNTUwMzYwfQ.6mBRr-gtySjLmZrg5ZIQkKOA2GNjMCiR-Fqe98GDZbo";
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
    if (status === "success") {
      return { status, statusCode, message, data };
    } else {
      return Promise.reject({ status, statusCode, message });
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, body) => apiClient.post(url, body),
  put: (url, body) => apiClient.put(url, body),
  delete: (url) => apiClient.delete(url),
};
