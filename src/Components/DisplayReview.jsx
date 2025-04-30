import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const DisplayReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    axios
      .get(`https://book-backend-uu0f.onrender.com/review/${id}`)
      .then((res) => {
        setReview(res.data);
      });
  }, [id]);

  if (!review) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "rgb(210, 180, 140)",
        minHeight: "100vh",
      }}
    >
      <img
        style={{
          width: "350px",
          height: "60vh",
          marginLeft:"-15px"
        }}
        src={review.image}
        alt={review.bookTitle}
      />
      <Button
        variant="contained"
        style={{ marginLeft:"-230px"}}
      >
        Buy Now
      </Button>

     <div style={{textAlign:"justify"}}>
        <p><strong>{review.bookTitle}</strong></p>
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
  );
};

export default DisplayReview;
