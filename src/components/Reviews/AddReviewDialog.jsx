import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
} from "@mui/material";
import { createReview } from "../../api/reviewApi";
import { showSweetAlert } from "../../utils/sweetAlertUtil";
import { handleApiError } from "../../utils/handleApiError";
import { MESSAGES, NAMES } from "../../utils/constants";

const AddReviewDialog = ({
  open,
  onClose,
  bookId,
  reviews,
  setReviews,
  setAverageRating,
}) => {
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const handleAddReview = async () => {
    const reviewData = { bookId, content: reviewContent, rating: reviewRating };

    try {
      const response = await createReview(reviewData);

      const newReviews = [...reviews, response.data];
      setReviews(newReviews);

      const totalRating = newReviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      setAverageRating((totalRating / newReviews.length).toFixed(1));

      setReviewContent("");
      setReviewRating(0);

      onClose();

      showSweetAlert({
        icon: "success",
        title: MESSAGES.REVIEW_SUCCESS,
        text: MESSAGES.REVIEW_SUCCESS_MESSAGE,
      });
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleReviewChange = (event) => {
    const inputText = event.target.value;
    const words = inputText.trim().split(/\s+/);

    if (words.length <= 20) {
      setReviewContent(inputText);
      setWordCount(words.length);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            slotProps={{}}
            multiline
            rows={3}
            label={MESSAGES.REVIEW_WRITE}
            variant="outlined"
            value={reviewContent}
            onChange={handleReviewChange}
            helperText={`${wordCount}/20 words`}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Rating
              value={reviewRating}
              onChange={(e, value) => setReviewRating(value)}
            />
            <span>{reviewRating || "0"}/5</span>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          {NAMES.BOOK.CANCEL_BUTTON}
        </Button>
        <Button
          onClick={handleAddReview}
          color="secondary"
          variant="contained"
          disabled={!reviewContent || reviewRating === 0}
        >
          {NAMES.BOOK.SUBMIT_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewDialog;
