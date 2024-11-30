import React, { useEffect, useState } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import BookCard from "../components/Books/BookCard";
import Loader from "../components/Layout/Loader";
import { fetchUserLibrary, removeBookFromLibrary } from "../api/libraryApi";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";
import { showSweetAlert } from "../utils/sweetAlertUtil";
import Swal from "sweetalert2";
import { MESSAGES, NAMES } from "../utils/constants";

const MyLibraryPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyBooks = async () => {
      try {
        const response = await fetchUserLibrary();
        const booksWithImages = response.data.map((book) => {
          const randomImage = Math.floor(Math.random() * 1000) + 1;
          return {
            ...book,
            Book: {
              ...book.Book,
              coverImage: `https://picsum.photos/150/200?random=${randomImage}`,
            },
          };
        });
        setBooks(booksWithImages);
      } catch (err) {
        console.error(err.message);
        handleApiError(err);
      }
    };

    getMyBooks();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/books/${id}`, { state: { isEditing: true } });
  };

  const onRemoveFromLibrary = async (bookId) => {
    try {
      const result = await Swal.fire({
        title: MESSAGES.BOOK_REMOVE_SURE,
        text: MESSAGES.BOOK_REMOVE_CONFIRM_MESSAGE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: MESSAGES.BOOK_REMOVE_CONFIRM,
        cancelButtonText: NAMES.BOOK.CANCEL_BUTTON,
      });

      if (result.isConfirmed) {
        await removeBookFromLibrary(bookId);
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.BookId !== bookId)
        );
        showSweetAlert({
          icon: "success",
          title: MESSAGES.BOOK_REMOVE_SUCCESS,
          text: MESSAGES.BOOK_REMOVE_SUCCESS_MESSAGE,
        });
      }
    } catch (err) {
      console.error(err);
      handleApiError(err);
    }
  };

  if (!books) {
    return <Loader />;
  }

  return (
    <div className="p-10 md:px-28">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {NAMES.NAV_BAR.MY_LIBRARY}
      </Typography>
      {books.length ? (
        <Grid container spacing={3}>
          {books?.map((book) => (
            <Grid key={book?.BookId}>
              <BookCard
                book={book?.Book}
                library={true}
                status={book?.status}
                onView={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={onRemoveFromLibrary}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ mt: 5 }}>
          Your library is empty. Start adding books!
        </Typography>
      )}
    </div>
  );
};

export default MyLibraryPage;
