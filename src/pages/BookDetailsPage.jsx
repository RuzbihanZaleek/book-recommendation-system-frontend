import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import { fetchBookById } from "../api/bookApi";
import Loader from "../components/Layout/Loader";
import { fetchReviewsForBook } from "../api/reviewApi";
import { handleApiError } from "../utils/handleApiError";
import { fetchUserBookById, updateBookStatus } from "../api/libraryApi";
import { showSweetAlert } from "../utils/sweetAlertUtil";
import AddReviewDialog from "../components/Reviews/AddReviewDialog";
import ReviewCarousel from "../components/Reviews/ReviewCarousel";
import BookDetailsHeader from "../components/Books/BookDetailsHeader";
import { useUser } from "../context/UserContext";

const BookDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [editMode, setEditMode] = useState(isEditing);
  const [status, setStatus] = useState("");
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [userReviewed, setUserReviewed] = useState(false);
  const { userId } = useUser();

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
        console.error(err.message);
        handleApiError(err);
      }
    };

    const getUserBook = async () => {
      try {
        const response = await fetchUserBookById(id);
        const randomImage = Math.floor(Math.random() * 1000) + 1;
        const bookWithImage = {
          ...response.data,
          Book: {
            ...response.data.Book,
            coverImage: `https://picsum.photos/150/200?random=${randomImage}`,
          },
        };
        setBook(bookWithImage);
        setStatus(response.data.status);
      } catch (err) {
        console.error(err.message);
        handleApiError(err);
      }
    };

    const getBookReviews = async () => {
      try {
        const response = await fetchReviewsForBook(id);
        setReviews(response.data);


        // Check if the current user has reviewed this book
        const userReview = response.data.some((review) => review.UserId === userId);
        console.log(userId);
        console.log(userReview);
        setUserReviewed(userReview);

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
        console.error(err.message);
        handleApiError(err);
      }
    };

    isEditing ? getUserBook() : getBookDetails();
    getBookReviews();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await updateBookStatus(id, status);
      showSweetAlert({
        icon: "success",
        title: "Status Updated",
        text: "Book status updated successfully",
      });
      setEditMode(false);
      navigate("/library");
    } catch (err) {
      console.error(err.message);
      handleApiError(err);
    }
  };

  if (!book) {
    return <Loader />;
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, maxWidth: "1200px", margin: "auto" }}>
      <BookDetailsHeader
        book={book}
        isEditing={isEditing}
        averageRating={averageRating}
        userReviewed={userReviewed}
        editMode={editMode}
        status={status}
        setStatus={setStatus}
        onUpdateStatus={handleUpdateStatus}
        setEditMode={setEditMode}
        openReviewDialog={() => setOpenReviewDialog(true)}
      />
      {/* Scrollable Carousel for Reviews */}
      <ReviewCarousel reviews={reviews} />
      {/* Add Review Dialog */}
      <AddReviewDialog
        open={openReviewDialog}
        onClose={() => setOpenReviewDialog(false)}
        bookId={id}
        reviews={reviews}
        setReviews={setReviews}
        setAverageRating={setAverageRating}
      />
    </Box>
  );
};

export default BookDetailsPage;
