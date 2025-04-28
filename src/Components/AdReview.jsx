import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AdReview = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3004/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete a review
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3004/review/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div style={{ padding: "20px",backgroundColor: "rgb(210, 180, 140)",minHeight:"100vh" }}>
      <h2 style={{margin:"0px",marginBottom:"10px"}}>Manage Reviews</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>Review</strong></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.bookTitle}</TableCell>
                <TableCell>{review.username}</TableCell>
                <TableCell>{review.reviewText}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {reviews.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No reviews available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdReview;
