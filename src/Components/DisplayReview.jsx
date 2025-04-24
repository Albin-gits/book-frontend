import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      <h1>{review.bookTitle}</h1>
      <img src={review.image} alt={review.bookTitle} />
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
  );
};

export default DisplayReview;
