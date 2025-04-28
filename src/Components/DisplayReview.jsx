import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const DisplayReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3004/review/${id}`).then((res) => {
      setReview(res.data);
    });
  }, [id]);

  if (!review) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px",backgroundColor: "rgb(210, 180, 140)",minHeight: "100vh",}}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <div style={{ display: "inline-block",width:"400px",marginLeft:"40px",}}>
      <img style={{width: "380px",
            height: "70vh",
            marginTop: "10px",
            float: "left",marginBottom:"0px"}}src={review.image} alt={review.bookTitle} />
            <Button variant="contained"sx={{display:"flex",marginLeft:"130px",marginTop:"0px"}}>Buy Now</Button>
      </div>
      <div style={{marginLeft:"10px",width:"450px",marginTop:"-100px"}}>
      <h1>{review.bookTitle}</h1>
      <p>
        <strong>Price:</strong> {review.price}
      </p>
      <p>
        <strong>Subtitle:</strong> {review.subtitle}
      </p>
      <p>
        <strong>Review:</strong> {review.reviewText}
      </p>
      <p>
        <strong>By:</strong> {review.username}
      </p>
      </div>
    </div>
    </div>
  );
};

export default DisplayReview;
