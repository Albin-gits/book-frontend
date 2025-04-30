import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Box,
  CardMedia,
} from "@mui/material";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("username");

  useEffect(() => {
    axios.get("https://book-backend-uu0f.onrender.com/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`https://book-backend-uu0f.onrender.com/review/${id}`);
    setReviews(reviews.filter((r) => r._id !== id));
  };

  const handleUpdate = (review) => {
    navigate(`/bookreview/${review.isbn13}`, { state: { review } });
  };

  return (
    <div style={{ backgroundColor: "rgb(210, 180, 140)", minHeight: "100vh" }}>
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          All Reviews
        </Typography>
        <Grid container spacing={4}>
          {reviews.map((review) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3} // Added lg breakpoint for larger screens
              key={review._id}
              sx={{ display: "flex" }}
            >
              <Card
                onClick={() => navigate(`/displayreview/${review._id}`)}
                sx={{
                  height: "100%", // Make card height responsive
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%", // Make card width responsive
                  "&:hover": { boxShadow: 6 },
                  position: "relative",
                }}
              >
                <CardMedia
                  sx={{
                    height: { xs: 150, sm: 180, md: 200 }, // Responsive image height
                    width: "auto",  // Maintain aspect ratio
                    maxWidth: "100%", // Ensure image doesn't overflow
                    margin: "auto",
                    marginTop: "1rem",
                    flexShrink: 0,
                  }}
                  image={review.image}
                  title={review.bookTitle}
                />
                <CardContent sx={{ flexGrow: 1, overflow: "hidden", maxHeight: "auto" }}>
                  <Typography
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      marginTop: "1rem",
                      fontSize: { xs: '1.2rem', sm: '1.3rem' }, // Responsive font size
                    }}
                    variant="h6"
                    gutterBottom
                    noWrap
                  >
                    {review.bookTitle}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ marginTop: "0.5rem", fontSize: {xs: '0.8rem', sm: '0.9rem'} }}
                  >
                    By: {review.username}
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    color: "white",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{fontSize: {xs: '1rem', sm: '1.2rem'} }}>Click for review</Typography>
                </Box>

                {review.username === loggedInUser && (
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(review);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(review._id);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Reviews;
