import { apiService } from "../utils/api";

export const fetchAllReviews = () => apiService.get("/reviews");
export const fetchReviewsByUser = () => apiService.get("/reviews/user");
export const fetchReviewsForBook = (bookId) =>
  apiService.get(`/reviews/book/${bookId}`);
export const createReview = (reviewData) =>
  apiService.post("/reviews", reviewData);
export const deleteReview = (bookId) => apiService.delete(`/reviews/${bookId}`);
