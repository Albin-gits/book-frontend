import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles'; // Import styled

const DisplayReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [bookUrl, setBookUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let fetchedReview;

    axios
      .get(`https://book-backend-uu0f.onrender.com/review/${id}`)
      .then((res) => {
        if (res.data) {
          fetchedReview = res.data;
          setReview(res.data);
          return axios.get(`http://localhost:3004/books/${res.data.isbn13}`);
        } else {
          setError("Review not found.");
          setLoading(false);
          return Promise.reject("Review not found");
        }
      })
      .then((bookRes) => {
        setBookUrl(bookRes.data.url || "");
        setLoading(false);
      })
      .catch((err) => {
        if (err !== "Review not found") {
          setError(err.message || "Failed to fetch data.");
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!review) return <p>Review not found.</p>;

  const getValidUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return "https://" + url;
  };

  const validUrl = getValidUrl(bookUrl);

  // Use styled to create a custom button component
  const BuyNowButton = styled(Button)(({ theme }) => ({
    display: "flex",
    marginLeft: "50px",
    marginTop: "25px",
    // Add these properties to control the size
    width: 'fit-content', // Make the width fit the content
    padding: '8px 16px',     // Adjust padding as needed
  }));

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
          width: "150px",
          height: "200px",
          marginLeft: "30px",
          marginTop:"10px",
        }}
        src={`http://localhost:3004/uploads/${review.image}`}
        alt={review.bookTitle}
      />

      {validUrl ? (
        <BuyNowButton // Use the custom button
          variant="contained"
          href={validUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Now
        </BuyNowButton>
      ) : (
        <p style={{ marginLeft: "105px", marginTop: "-20px" }}>URL not available</p>
      )}

      <div style={{marginLeft:"30px",}}>
        <p>
          <strong>{review.bookTitle}</strong>
        </p>
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
