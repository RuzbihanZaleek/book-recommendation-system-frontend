import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchBookById } from "../api/bookApi";
import Loader from "../components/Layout/Loader";
import { fetchReviewsForBook } from "../api/reviewApi";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const response = await fetchBookById(id);
        const randomImage = Math.floor(Math.random() * 1000) + 1;
        const bookWithImage = {
          ...response.data,
          coverImage: `https://picsum.photos/150/200?random=${randomImage}`,
        };
        setBook(bookWithImage);
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    };

    const getBookReviews = async () => {
      try {
        const response = await fetchReviewsForBook(id);
        setReviews(response.data);

        // Calculate average rating
        const totalRating = response.data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const average = response.data.length
          ? totalRating / response.data.length
          : 0;
        setAverageRating(average.toFixed(1));
      } catch (err) {
        console.error("Error fetching book reviews:", err);
      }
    };

    getBookDetails();
    getBookReviews();
  }, [id]);

  if (!book) {
    return <Loader />;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, maxWidth: "1200px", margin: "auto" }}>
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
            sx={{ height: 300, width: "100%" }}
            image={book.coverImage}
            alt={book.title}
          />
        </Card>

        {/* Book Details */}
        <Box>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: 2 }}
            fontStyle="italic"
          >
            {book.description}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            <strong>Author:</strong> {book.author}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Genre:</strong> {book.genre}
          </Typography>
          <Typography variant="body1">
            <strong>Published Date:</strong>{" "}
            {new Date(book.published_date).toLocaleDateString()}
          </Typography>
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

      {/* Scrollable Carousel for Reviews */}
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2 }} fontStyle="italic">
          Reviews
        </Typography>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          pauseOnHover={true}
          arrows={false}
        >
          {reviews.map((review) => (
            <Card
              key={review.id}
              sx={{
                padding: 2,
                margin: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "left",
              }}
            >
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {review.content}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Rating value={review.rating} readOnly precision={0.5} />
                <Typography variant="subtitle2" color="textSecondary">
                  - {review.User.username}
                </Typography>
              </Box>
            </Card>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default BookDetailsPage;
