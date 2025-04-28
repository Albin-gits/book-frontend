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

const AdBooks = () => {
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
    <div style={{ padding:"10px",backgroundColor: "rgb(210, 180, 140)", maxWidth: "100%" }}>
        <h1 style={{margin:"0px",marginBottom:"10px"}}>Books List</h1>
      <Grid container spacing={3}>
        {user.map((val) => {
          return (
            <Grid size={3} sx={{ marginTop: "20px", marginBottom: "20px" }}>
              <Link
                to={`/BookReview/${val.isbn13}`}
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
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140, marginTop: "10px" }}
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
export default AdBooks;
