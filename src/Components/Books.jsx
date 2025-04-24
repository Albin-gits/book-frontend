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
}));

const Books = () => {
  var [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.itbook.store/1.0/new")

      .then((response) => {
        console.log(response.data.items);
        setUser(response.data.books);
      });
  }, []);
  return (
    <div style={{backgroundColor: "rgb(210, 180, 140)"}}>
      <Grid container spacing={3}>
        {user.map((val) => {
          return (
            <Grid size={3}>
              <Link
                to={`/BookReview/${val.isbn13}`}
                style={{ textDecoration: "none" }}
              >
                <Item sx={{
                    position: "relative",
                    "&:hover .hoverText": {
                      opacity: 1,
                    },
                  }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140,
                      }}
                      image={val.image}
                      title={val.title}
                    />
                    
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {val.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {val.subtitle}
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
