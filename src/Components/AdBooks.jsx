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
    image: null,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3004/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

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

      await axios.post("http://localhost:3004/addbook", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Book added successfully!");
      fetchBooks();
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
      alert("Error adding book: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "10px", backgroundColor: "rgb(210, 180, 140)",minHeight:"100vh"}}>
      <h1 style={{textAlign:"center"}}>Books List</h1>
      <Grid container spacing={5} sx={{marginLeft:"80px"}}>
        {books.map((val) => (
          <Grid item xs={12} sm={6} md={3} key={val._id}>
            <Item>
              <Card sx={{ maxWidth: 345,width:"220px",height:"350px"}}>
                <CardMedia
                  sx={{ height:190,width:"150px",marginLeft:"33px"}}
                  image={`http://localhost:3004/uploads/${val.image}`} 
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
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={3} sx={{marginTop:"55px"}}>
          <Item> 
            <Card sx={{ maxWidth: 345,width:"200px",}}>
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

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Book Title"
            fullWidth
            required
            value={newBook.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="subtitle"
            label="Subtitle"
            fullWidth
            value={newBook.subtitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="isbn13"
            label="ISBN13"
            fullWidth
            value={newBook.isbn13}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            fullWidth
            value={newBook.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="url"
            label="Book URL"
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
