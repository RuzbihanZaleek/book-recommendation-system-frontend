import { Typography, Card, Rating, Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import { NAMES } from "../../utils/constants";

const ReviewCarousel = ({ reviews }) => {
  console.log(reviews);
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: 2 }} fontStyle="italic">
        {NAMES.REVIEWS}
      </Typography>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2000}
        pauseOnHover
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
            <Typography>{review.content}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Rating value={review.rating} readOnly precision={0.5} />
              <Typography variant="subtitle2" color="textSecondary">
                - {review.User?.username}
              </Typography>
            </Box>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default ReviewCarousel;
