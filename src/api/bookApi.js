import { apiService } from "../utils/api";

export const fetchBooks = () => apiService.get("/books");
export const fetchBookById = (id) => apiService.get(`/books/${id}`);
export const createBook = (bookData) => apiService.post("/books", bookData);
export const updateBook = (id, bookData) =>
  apiService.put(`/books/${id}`, bookData);
export const deleteBook = (id) => apiService.delete(`/books/${id}`);
