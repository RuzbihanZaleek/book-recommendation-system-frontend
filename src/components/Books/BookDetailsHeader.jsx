import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Select,
  MenuItem,
  Rating,
} from "@mui/material";

const BookDetailsHeader = ({
  book,
  isEditing,
  averageRating,
  userReviewed,
  editMode,
  status,
  setStatus,
  onUpdateStatus,
  setEditMode,
  openReviewDialog,
}) => {
  const bookData = isEditing ? book.Book : book;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: 4,
        marginBottom: 4,
      }}
    >
      {/* Book Cover Image */}
      <Card sx={{ maxWidth: 400, flexShrink: 0 }}>
        <CardMedia
          component="img"
          sx={{ height: 450, width: "100%" }}
          image={bookData.coverImage}
          alt={bookData.title}
        />
      </Card>

      {/* Book Details */}
      <Box>
        <Typography variant="h4" gutterBottom>
          {bookData.title}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: 2 }}
          fontStyle="italic"
        >
          {bookData.description}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          <strong>Author:</strong> {bookData.author}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Genre:</strong> {bookData.genre}
        </Typography>
        <Typography variant="body1">
          <strong>Published Date:</strong>{" "}
          {new Date(bookData.published_date).toLocaleDateString()}
        </Typography>

        {/* Status Field */}
        {editMode && (
          <Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Status:</strong>
              </Typography>
              <Box>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{ marginBottom: 2 }}
                >
                  <MenuItem value="reading">Reading</MenuItem>
                  <MenuItem value="finished">Finished</MenuItem>
                  <MenuItem value="plan_to_read">Plan to Read</MenuItem>
                </Select>
                <Box>
                  <Button
                    onClick={onUpdateStatus}
                    variant="outlined"
                    color="success"
                    sx={{ marginRight: 2 }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditMode(false)}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
            {!userReviewed && (
              <Box sx={{ marginTop: 2 }}>
                <Button
                  onClick={openReviewDialog}
                  variant="contained"
                  color="secondary"
                >
                  Add Review
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* Display Average Rating */}
        {averageRating !== null && (
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              <strong>Average Rating:</strong>
            </Typography>
            <Rating
              value={parseFloat(averageRating)}
              readOnly
              precision={0.1}
            />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {averageRating} / 5
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BookDetailsHeader;
