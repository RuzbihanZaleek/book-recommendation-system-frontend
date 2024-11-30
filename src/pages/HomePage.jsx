import React, { useEffect, useState } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import BookCard from "../components/Books/BookCard";
import { fetchBooks } from "../api/bookApi";
import { useNavigate } from "react-router-dom";
import { addBookToLibrary, fetchUserLibrary } from "../api/libraryApi";
import { showSweetAlert } from "../utils/sweetAlertUtil";
import Loader from "../components/Layout/Loader";
import { handleApiError } from "../utils/handleApiError";
import { MESSAGES, VALIDATIONS } from "../utils/constants";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const [bookResponse, libraryResponse] = await Promise.all([
          fetchBooks(),
          fetchUserLibrary(),
        ]);

        const booksWithImages = bookResponse.data.map((book) => {
          const randomImage = Math.floor(Math.random() * 1000) + 1;
          return {
            ...book,
            coverImage: `https://picsum.photos/150/200?random=${randomImage}`,
          };
        });

        const libraryBookIds = libraryResponse.data.map(
          (libraryBook) => libraryBook.BookId
        );

        setBooks(
          booksWithImages.map((book) => ({
            ...book,
            inLibrary: libraryBookIds.includes(book.id),
          }))
        );
      } catch (err) {
        console.error(err.message);
        handleApiError(err);
      }
    };

    getBooks();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const onAddToLibrary = async (bookId) => {
    try {
      await addBookToLibrary(bookId);
      showSweetAlert({
        icon: "success",
        title: MESSAGES.BOOK_ADDED,
        text: MESSAGES.BOOK_ADDED_MESSAGE,
      });

      // Update the book's inLibrary status
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, inLibrary: true } : book
        )
      );
    } catch (err) {
      console.error(err.message);
      handleApiError(err, "info", VALIDATIONS.ALREADY_EXISTS);
    }
  };

  if (!books) {
    return <Loader />;
  }

  return (
    <div className="p-10 md:px-28">
      <Typography variant="h4" gutterBottom align="center">
        Welcome to the Book Recommendation System
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        Track your books, leave reviews, and get personalized recommendations!
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book.id}>
            <BookCard
              book={book}
              onView={handleViewDetails}
              onAddToLibrary={onAddToLibrary}
              inLibrary={book.inLibrary}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
