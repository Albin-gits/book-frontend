import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdBooks = () => {
  const [books, setBooks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    subtitle: "",
    isbn13: "",
    price: "",
    url: "",
    image: null, // file object
  });

  // Fetch books from your backend API
  useEffect(() => {
    axios
      .get("https://book-backend-uu0f.onrender.com/books") // Changed API endpoint
      .then((response) => {
        setBooks(response.data); // Assuming your backend returns an array of book objects
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  // Handle text field changes (remains the same)
  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Handle form submission (remains largely the same)
  const handleAddBook = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newBook.title);
      formData.append("subtitle", newBook.subtitle);
      formData.append("isbn13", newBook.isbn13);
      formData.append("price", newBook.price);
      formData.append("url", newBook.url);
      if (newBook.image) {
        formData.append("image", newBook.image);
      }

      // Log the FormData for debugging (optional)
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await axios.post(
        "https://book-backend-uu0f.onrender.com/addbook",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Book added successfully!");
      setOpenForm(false);
      setNewBook({
        title: "",
        subtitle: "",
        isbn13: "",
        price: "",
        url: "",
        image: null,
      });
    } catch (error) {
      console.error("Add book error:", error.response?.data || error.message);
      alert(
        "Error adding book: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "rgb(210, 180, 140)",
        maxWidth: "100%",
      }}
    >
      <h1>Books List</h1>
      <Grid container spacing={3}>
        {books.map((val) => (
          <Grid item xs={12} sm={6} md={3} key={val.isbn13}>
            <Link
              to={`/BookReview/${val.isbn13}`}
              style={{ textDecoration: "none" }}
            >
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    // Assuming your book object from the database has an 'image' property
                    image={`https://book-backend-uu0f.onrender.com/uploads/${val.image}`}
                    title={val.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{val.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {val.subtitle}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {val.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Link>
          </Grid>
        ))}

        {/* Add New Book Card (remains the same) */}
        <Grid item xs={12} sm={6} md={3}>
          <Item
            sx={{
              border: "2px dashed #888",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Add a New Book
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenForm(true)}
                >
                  Add Book
                </Button>
              </CardContent>
            </Card>
          </Item>
        </Grid>
      </Grid>

      {/* Dialog Form for New Book (remains the same) */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Book Title"
            type="text"
            fullWidth
            required
            value={newBook.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="subtitle"
            label="Subtitle"
            type="text"
            fullWidth
            value={newBook.subtitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="isbn13"
            label="ISBN13"
            type="text"
            fullWidth
            value={newBook.isbn13}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="text"
            fullWidth
            value={newBook.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="url"
            label="Book URL"
            type="url"
            fullWidth
            value={newBook.url}
            onChange={handleInputChange}
          />
          <label style={{ marginTop: "15px", display: "block" }}>
            Upload Book Cover Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewBook({ ...newBook, image: e.target.files[0] })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleAddBook} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdBooks;