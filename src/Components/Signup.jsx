import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

// Styled components for better control
const SignupContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'white',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
    width: { xs: '100%', md: '50%' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const SignupFormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: { xs: '100%', md: '50%' },
    maxWidth: '400px',
    margin: '0 auto',
}));

const FormTitle = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontSize: '1.8rem',
    fontWeight: 500,
    fontFamily: 'Roboto, sans-serif',
    color: '#000',
}));

const StyledInput = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    width: '100%',
      "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "orange", // Set the outline color
    },
    "&:hover fieldset": {
      borderColor: "orange", // Set the hover outline color
    },
    "&.Mui-focused fieldset": {
      borderColor: "orange", // Set the focused outline color
      boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.2)', // Add a subtle shadow
    },
  },
  "& .MuiInputLabel-root": {
    color: "#000", // Label color
    "&.Mui-focused": {
      color: "orange", // Label color when focused
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    backgroundColor: 'rgb(129,77,8)',
    color: 'white',
    width: '100%',
    padding: theme.spacing(1.2),
    '&:hover': {
        backgroundColor: 'rgb(100, 60, 5)',
    },
}));

const Signup = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: '', username: '', password: '' });

    const Inputhandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const addHandler = () => {
        if (!inputs.email || !inputs.username || !inputs.password) {
            alert('Please fill in all the required fields.');
            return;
        }
        axios
            .post('https://book-backend-uu0f.onrender.com/add', inputs)
            .then((response) => {
                console.log(response);
                alert(response.data.message);
                navigate('/Login');
            })
            .catch((err) => {
                console.log(err);
                alert('Signup failed. Please try again.');
            });
    };

    return (
        <SignupContainer>
            <ImageContainer>
                <img
                    style={{
                        maxWidth: '100%',
                        minHeight:"100vh",
                        
                        maxHeight: '90vh',
                        objectFit: 'cover',
                        marginTop:"5px"
                    }}
                    src="book3.jpg"
                    alt="book"
                />
            </ImageContainer>
            <SignupFormContainer>
                <Typography variant="body1" sx={{  marginBottom: '0.5rem', fontSize: '1rem' }}>Start your journey</Typography>
                <FormTitle variant="h3">SIGNUP to Book Reviews</FormTitle>
                <StyledInput
                    label="Email"
                    variant="outlined"
                    color="warning"
                    name="email"
                    value={inputs.email}
                    onChange={Inputhandler}
                    required
                    type="email"
                    autoComplete="off"
                />
                <StyledInput
                    label="Username"
                    variant="outlined"
                    color="warning"
                    name="username"
                    value={inputs.username}
                    onChange={Inputhandler}
                    required
                    type="text"
                    autoComplete="off"
                />
                <StyledInput
                    label="Password"
                    variant="outlined"
                    color="warning"
                    name="password"
                    value={inputs.password}
                    onChange={Inputhandler}
                    required
                    type="password"
                    autoComplete="off"
                />
                <StyledButton variant="contained" onClick={addHandler}>
                    SIGNUP
                </StyledButton>
                <Typography variant="body2" sx={{ mt: 1, fontSize: '0.9rem' }}>
                    Have an account? <Link to="/Login" style={{ color: 'blue' }}>Login</Link>
                </Typography>
            </SignupFormContainer>
        </SignupContainer>
    );
};

export default Signup;
