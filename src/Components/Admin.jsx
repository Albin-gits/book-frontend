import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { BrowserRouter, Route, useNavigate } from "react-router-dom"; // If you're using React Router for navigation
import ReviewsOverTimeChart from "./ReviewsOverTimeChart"; // Adjust path as needed
import MostPopularBooksChart from "./MostPopularBooksChart";

const Admin = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [reviewsOverTimeData, setReviewsOverTimeData] = useState([]);
  const [mostPopularBooksData, setMostPopularBooksData] = useState([]);
  useEffect(() => {
    // Fetch user count
    fetch("http://localhost:3004/usercount")
      .then((res) => res.json())
      .then((data) => setUserCount(data.count))
      .catch((err) => console.error("Error fetching user count:"  , err));

    // Fetch review count
    fetch("http://localhost:3004/reviewcount")
      .then((res) => res.json())
      .then((data) => setReviewCount(data.count))
      .catch((err) => console.error("Error fetching review count:", err));

    // Fetch book count
    fetch("http://localhost:3004/bookcount")
      .then((res) => res.json())
      .then((data) => setBookCount(data.count))
      .catch((err) => console.error("Error fetching book count:", err));
    fetch("http://localhost:3004/reviews-over-time")
      .then((res) => res.json())
      .then((data) => setReviewsOverTimeData(data))
      .catch((err) =>
        console.error("Error fetching reviews over time data:", err)
      );

    // Fetch data for Most Popular Books
    fetch("http://localhost:3004/most-popular-books")
      .then((res) => res.json())
      .then((data) => setMostPopularBooksData(data))
      .catch((err) =>
        console.error("Error fetching most popular books data:", err)
      );
  }, []);
  const dashboardItems = [
    {
      title: "Total Books",
      value: bookCount,
      color: "#2196F3", // Blue
      icon: (
        <span style={{ fontSize: "2em" }}>
          <img src="iconbook.png" />
        </span>
      ), // Example icon
      linkTo: "/AdBooks", // Replace with your actual route
    },
    {
      title: "Total Users",
      value: userCount,
      color: "green", // Orange
      icon: (
        <span style={{ fontSize: "2em" }}>
          <img src="iconuser.png" />
        </span>
      ), // Example icon
      linkTo: "/AdUser", // Replace with your actual route
    },
    {
      title: "Total reviews",
      value: reviewCount,
      color: "#F44336", // Red
      icon: (
        <span style={{ fontSize: "2em" }}>
          <img src="iconreview.png" />
        </span>
      ), // Example icon
      linkTo: "/AdReview", // Replace with your actual route
    },
  ];

  return (
    
      
     
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "35px", // Adjust the width as needed
          backgroundColor: "rgb(40,20,5)", // Example blue color - use the color from your image
          height: "700px", // Make it span the full height of the parent
          marginTop: "75px",
          marginLeft: "8px",
        }}
      ></div>
      <div style={{ marginLeft: "35px", marginTop: "5px" }}>
        <div
          style={{
            backgroundColor: "lightgray",
            marginTop: "18px",
            marginLeft: "25px",
          }}
        >
          {" "}
          <Typography
            variant="h4"
            sx={{
              marginTop: "0px",
              marginLeft: "20px",
              display: "inline-block",
              fontFamily: "inherit  ",
            }}
          >
            DASHBOARD
            <Typography
              sx={{
                display: "inline-block",
                marginLeft: "15px",
                fontFamily: "-moz-initial",
              }}
              variant="h6"
            >
              Control panel
            </Typography>
          </Typography>
        </div>
        <Grid container spacing={5} sx={{ padding: 3 }}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardActionArea
                onClick={() => navigate(item.linkTo)}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    "& .overlay": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                    "& .cardContent": {
                      transform: "translateY(-30px)", // Adjust as needed
                    },
                  },
                }}
              >
                <Card
                  sx={{
                    backgroundColor: item.color,
                    color: "white",
                    width: "320px",
                    height: "140px",
                    borderRadius: "10px",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {item.value}
                    </Typography>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontSize: "2em",
                        opacity: 0.7,
                        marginTop: "10px",
                      }}
                    >
                      {item.icon}
                    </div>
                  </CardContent>
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      height: "auto",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transform: "translateY(100%)",
                      transition:
                        "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                      borderRadius: "0 0 10px 10px",
                    }}
                  >
                    <Typography variant="body2">Click to view</Typography>
                  </Box>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} sx={{ padding: 3, marginTop: 2,marginLeft:"50px" }}>
          <Grid item xs={12} md={6}>
            <h2>Reviews Over Time</h2>
            <ReviewsOverTimeChart data={reviewsOverTimeData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <h2>Most Popular Books</h2>
            <MostPopularBooksChart data={mostPopularBooksData} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Admin;
