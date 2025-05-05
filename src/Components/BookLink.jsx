import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Container, Button } from '@mui/material';
import axios from 'axios';

const BookLink = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://api.itbook.store/1.0/new')
      .then((res) => setBooks(res.data.books))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {books.map((book, index) => (
          <Grid item xs={12} key={index}>
            <div style={{ display: 'flex', width: '100%' }}>
              <Card sx={{ height: 200, overflow: 'hidden', width: 200 }}>
                <CardMedia
                  component="img"
                  image={book.image}
                  alt={book.title}
                  sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
              </Card>
              <div style={{ marginLeft: 16, width: '700px' }}>
                <Button
                  variant="contained"
                  sx={{ marginTop: '60px' }}
                  href={book.url} // Use the book's URL here
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Recommended for security with target="_blank"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookLink;