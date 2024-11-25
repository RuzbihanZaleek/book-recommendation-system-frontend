import React, { useEffect, useState } from "react";
import {
  Grid2 as Grid,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import BookCard from "../components/Books/BookCard";
import { fetchBooks } from "../api/bookApi";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetchBooks();
        const booksWithImages = response.data.map((book) => {
          const randomImage = Math.floor(Math.random() * 1000) + 1;
          return {
            ...book,
            coverImage: `https://picsum.photos/150/200?random=${randomImage}`,
          };
        });
        setBooks(booksWithImages);
      } catch (err) {
        console.error(err.message);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="px-10 md:px-28">
      <Typography variant="h4" gutterBottom align="center">
        Welcome to the Book Recommendation System
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        Track your books, leave reviews, and get personalized recommendations!
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
