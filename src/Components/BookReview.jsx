import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const BookReview = () => {
  const { isbn13 } = useParams();
 
  const navigate = useNavigate();
  const location = useLocation();
  const reviewToEdit = location.state?.review;
  const isEditing = !!reviewToEdit;

  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [reviewText, setReviewText] = useState(reviewToEdit?.reviewText || "");
  const [book, setBook] = useState(null);
  useEffect(() => {
    axios.get(`https://api.itbook.store/1.0/books/${isbn13}`).then((res) => {
      setBook(res.data);
    });
  }, [isbn13]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      username,
      reviewText,
      isbn13: book.isbn13,
      bookTitle: book.title,
      image: book.image,
      price: book.price,
      subtitle: book.subtitle,
    };
    if (isEditing) {
      await axios.put(`https://book-backend-uu0f.onrender.com/review/${reviewToEdit._id}`, review);
    } else {
      await axios.post("https://book-backend-uu0f.onrender.com/reviews", review);
    }

    navigate("/reviews");
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "20px",
        margin: "0px",
        padding: "0px",
        fontFamily: "Segoe UI",
        backgroundColor: "rgb(210, 180, 140)", //(245, 245, 220)//255, 153, 51//129,77,8
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <div
        style={{
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "0px",
            marginTop: "0px",
            paddingTop: "30px",
            paddingBottom: "0px",
          }}
        >
          {book.title}
        </h1>
        <img
          style={{
            marginBottom: "0px",
            marginTop: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
          src={book.image}
          alt={book.title}
        />
        <p
          style={{
            marginBottom: "0px",
            marginTop: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
        >
          <strong>Price:</strong> {book.price}
        </p>
        <p
          style={{
            marginBottom: "0px",
            marginTop: "0px",
            paddingTop: "10px",
            paddingBottom: "20px",
          }}
        >
          <strong>Subtitle:</strong> {book.subtitle}
        </p>
      </div>

      <hr />
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "20px auto",
          marginTop: "35px",
          borderRadius: "15px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            margin: "20px auto",
            height:"310px"
          }}
        >
          <h5
            style={{
              marginTop: "1px",
              textAlign: "center",
              fontSize: "23px",
              marginBottom: "20px",
            }}
          >
            Leave Your Review
          </h5>
          <label htmlFor="username" style={{ marginBottom: "5px" }}>
            Username:
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "8px",
              marginBottom: "10px",
              border: "1.5px solid rgb(129,77,8)",
              borderRadius: "5px",
              fontSize: "16px",
            }}
            required
            autoComplete="off"
          />

          <label htmlFor="review" style={{ marginBottom: "5px" }}>
            Review:
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{
              padding: "8px",
              marginBottom: "20px",
              border: "1.5px solid rgb(129,77,8)",
              borderRadius: "5px",
              fontSize: "16px",
              minHeight: "80px",
              resize: "vertical",
            }}
            placeholder="Enter your review..."
            required
          />

          <button
            type="submit"
            style={{
              padding: "8px 12px",
              backgroundColor: "rgb(129,77,8)",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "16px",
              marginBottom: "3px",
            }}
          >
            Submit
          </button>
          
        </form>
        <button
            style={{
              padding: "8px 12px",
              backgroundColor: "rgb(129,77,8)",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "16px",
              width:"215px",
              margin:"auto",
              marginBottom:"20px",marginTop:"0px",
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
      </div>
    </div>
  );
};

export default BookReview;
