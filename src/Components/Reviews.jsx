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
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6827169877299297';

    // Check if the script already exists to avoid duplicates
    if (!document.querySelector(`script[src="${script.src}"]`)) {
        document.head.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts (optional, but good practice)
    return () => {
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript) {
            document.head.removeChild(existingScript);
        }
    };
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
        <Typography variant="h4" align="center" gutterBottom>
          All Reviews
        </Typography>
        <Grid sx={{marginLeft:"25px",paddingLeft:"10px"}}container spacing={4}>
          {reviews.map((review) => (
            <Grid
              item  
              xs={12}
              sm={6}
              md={4}
              key={review._id}
              sx={{ display: "flex" }}
            >
              <Card
                onClick={() => navigate(`/displayreview/${review._id}`)}
                sx={{
                  height: 300,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "250px",
                  "&:hover": { boxShadow: 6 },
                  position: "relative",
                  
                }}
              >
                <CardMedia
                  sx={{
                    height: 150,
                    width: 180,
                    margin: "auto",
                    marginTop: "15px",
                  }}
                  image={review.image}
                />
                <CardContent
                  sx={{ flexGrow: 1, overflow: "hidden", maxHeight: 150 }}
                >
                  <Typography
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      marginTop: "15px",
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
                    sx={{ marginTop: "10px" }}
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
                    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
                    color: "white",
                    opacity: 0, // Initially hidden
                    transition: "opacity 0.3s ease", // Smooth transition

                    "&:hover": {
                      opacity: 1, // Show text on hover
                    },
                  }}
                >
                  <Typography variant="h6">Click for review</Typography>
                </Box>

                {review.username === loggedInUser && (
                  <CardActions>
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