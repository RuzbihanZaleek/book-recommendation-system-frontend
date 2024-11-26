import { apiService } from "../utils/api";

export const signup = (userData) => apiService.post("auth/signup", userData);
export const login = (credentials) => apiService.post("auth/login", credentials);