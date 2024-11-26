import { apiService } from "../utils/api";

export const fetchUserLibrary = () => apiService.get("/userBooks");
export const fetchUserBookById = (bookId) =>
  apiService.get(`/userBooks/${bookId}`);
export const addBookToLibrary = (bookId) =>
  apiService.post("/userBooks", { bookId });
export const updateBookStatus = (bookId, status) =>
  apiService.put(`/userBooks/${bookId}`, { status });
export const removeBookFromLibrary = (bookId) =>
  apiService.delete(`/userBooks/${bookId}`);
