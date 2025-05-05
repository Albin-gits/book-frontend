import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid"; //grid and card
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  width: "250px",
  marginLeft: "15px",
}));

const Books = () => {
  const [books, setBooks] = useState([]); 
  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);
  return (
    <div style={{ padding: "15px", backgroundColor: "rgb(210, 180, 140)",minHeight:"100vh"}}>
      <h1 style={{textAlign:"center"}}>Books</h1>
      <Grid container spacing={3}>
      
        {books.map((book) => {
          return (
            
            <Grid
              item
              xs={12} // Full width on extra-small screens (phones)
              sm={6} // Half width on small screens (larger phones, small tablets)
              md={4} // One-third width on medium screens (tablets)
              lg={3} // One-quarter width on large screens (desktops)
              xl={3} // One-quarter width on extra-large screens (large desktops)
           
            >
              <Link
                to={`/BookReview/${book.isbn13}`}
                style={{ textDecoration: "none" }}
              >
                <Item
                  sx={{
                    position: "relative",
                    "&:hover .hoverText": {
                      opacity: 1,
                    },
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: 345,width:"250px",height:"350px",
                      "@media (max-width: 600px)": {
                        // Adjust breakpoint as needed
                      },
                    }}
                  >
                    <CardMedia
                      sx={{  height:190,width:"150px",margin:"auto"}}
                      image={`http://localhost:3004/uploads/${book.image}`}
                      
                    />

                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                    {book.subtitle}
                  </Typography>
                      <Typography variant="subtitle2" color="primary">
                    {book.price}
                      </Typography>
                      
                    </CardContent>
                    <Box
                      className="hoverText"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.3)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h6">Click to add review</Typography>
                    </Box>
                  </Card>
                </Item>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Books;
