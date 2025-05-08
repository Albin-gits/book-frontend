import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BookReview = () => {
  const { isbn13 } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const reviewToEdit = location.state?.review;
  const isEditing = !!reviewToEdit;

  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [reviewText, setReviewText] = useState(reviewToEdit?.reviewText || "");
  const [book, setBook] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${isbn13}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [isbn13]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(blob);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book) return;

    if (!reviewText && !audioBlob) {
      alert("Please provide a text or voice review.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("isbn13", book.isbn13);
    formData.append("bookTitle", book.title);
    formData.append("image", book.image);
    formData.append("price", book.price);
    formData.append("subtitle", book.subtitle);
    if (reviewText) formData.append("reviewText", reviewText);
    if (audioBlob) formData.append("audio", audioBlob, "review.webm");

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3004/review/${reviewToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:3004/reviews",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      navigate("/reviews");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "rgb(210, 180, 140)", minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <h1>{book.title}</h1>
        <img
          src={`http://localhost:3004/uploads/${book.image}`}
          alt={book.title}
          style={{ height: "200px" }}
        />
        <p><strong>Price:</strong> {book.price}</p>
        <p><strong>Subtitle:</strong> {book.subtitle}</p>
      </div>

      <hr />
      <div style={{
        backgroundColor: "white", maxWidth: "300px", margin: "30px auto",
        borderRadius: "15px", padding: "20px"
      }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <h5 style={{ textAlign: "center", fontSize: "23px", marginBottom: "20px" }}>
            Leave Your Review
          </h5>

          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="off"
            style={{
              padding: "8px", marginBottom: "10px", border: "1.5px solid rgb(129,77,8)",
              borderRadius: "5px", fontSize: "16px"
            }}
          />

          <label>Text Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Enter your review..."
            style={{
              padding: "8px", marginBottom: "20px", border: "1.5px solid rgb(129,77,8)",
              borderRadius: "5px", fontSize: "16px", minHeight: "80px", resize: "vertical"
            }}
          />

          <label>Voice Review:</label>
          {recording ? (
            <button type="button" onClick={stopRecording} style={{height:"35px",color:"white", marginBottom: "10px" ,backgroundColor:"red",border:"none",borderRadius:"5px"}}>
              Stop Recording
            </button>
          ) : (
            <button type="button" onClick={startRecording} style={{height:"35px", color:"white",marginBottom: "10px",backgroundColor:"green",border:"none",borderRadius:"5px" }}>
              Start Recording
            </button>
          )}

          {audioBlob && (
            <audio controls style={{ marginBottom: "20px" }}>
              <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}

          <button
            type="submit"
            style={{
              padding: "8px 12px", backgroundColor: "rgb(129,77,8)", color: "white",
              border: "none", borderRadius: "3px", fontSize: "16px"
            }}
          >
            Submit
          </button>
        </form>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "15px", padding: "8px 12px", backgroundColor: "rgb(129,77,8)",
            color: "white", border: "none", borderRadius: "3px", fontSize: "16px",width:"100%"
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BookReview;
