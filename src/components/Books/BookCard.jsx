import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookCard = ({
  book,
  onView,
  onEdit,
  onDelete,
  onAddToLibrary,
  library = false,
}) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={book.coverImage}
      alt={book.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {book.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Author: {book.author}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Genre: {book.genre}
      </Typography>
      {library ? (
        <Box display="flex" justifyContent="space-between" gap={3} mt={2}>
          <Button
            variant="contained"
            onClick={() => onView(book.id)}
            color="secondary"
            size="large"
          >
            View Details
          </Button>
          <Box>
            <IconButton
              onClick={() => onEdit(book.id)}
              color="success"
              size="medium"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => onDelete(book.id)}
              color="error"
              size="medium"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-between" gap={1} mt={2}>
          <Button
            variant="contained"
            onClick={() => onView(book.id)}
            color="secondary"
            size="small"
          >
            View Details
          </Button>
          <Button
            variant="contained"
            onClick={() => onAddToLibrary(book.id)}
            color="success"
            size="small"
          >
            Add to Library
          </Button>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default BookCard;
