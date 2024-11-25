import { apiService } from "../utils/api";

export const fetchUserLibrary = () => apiService.get("/userBooks");
export const addBookToLibrary = (bookId) => apiService.post("/userBooks", { bookId });
export const removeBookFromLibrary = (bookId) => apiService.delete(`/userBooks/${bookId}`);
