import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

// Styled components for better control
const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: { xs: "column", md: "row" }, // Stack on small, row on medium+
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "white", // Set a background color if needed
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: { xs: "100%", md: "50%" }, // 100% on small, 50% on medium+
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const LoginFormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  width: { xs: "100%", md: "50%" }, // 100% on small, 50% on medium+
  maxWidth: "400px", // Limit the width of the form
  margin: "0 auto",
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  fontSize: "1.8rem", // Responsive font size
  fontWeight: 500,
  fontFamily: "Roboto, sans-serif",
  color: "#000",
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: "100%",
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

const StyledSelect = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: "100%",
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
  color: "orange",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  backgroundColor: "rgb(129,77,8)",
  color: "white",
  width: "100%",
  padding: theme.spacing(1.2),
  "&:hover": {
    backgroundColor: "rgb(100, 60, 5)", // Darker shade on hover
  },
}));

const Login = () => {
  const [usertype, setUsertype] = useState("");
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    if (!inputs.username || !inputs.password || !usertype) {
      alert("Please fill all fields including user type");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3004/view", inputs);
      alert(res.data.message);

      if (usertype === "admin" && inputs.username === "Admin") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", inputs.username);
        navigate("/Admin");
      } else if (usertype === "user") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");
        localStorage.setItem("username", inputs.username);
        navigate("/Books");
      } else {
        alert("Invalid user type or credentials.");
      }
    } catch (err) {
      alert("Login failed. Invalid credentials.");
    }
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <Typography variant="body1" sx={{  marginBottom: '0.5rem', fontSize: '1rem' }}>
          Start your journey
        </Typography>
        <FormTitle variant="h3">
          LOGIN to Book Reviews
        </FormTitle>
        <StyledSelect
          variant="outlined"
          color="warning"
        >
          <InputLabel id="usertype-label">User Type</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype"
            value={usertype}
            label="User Type"
            onChange={(e) => setUsertype(e.target.value)}
            color="warning"
          >
            <MenuItem value="">Select the User type </MenuItem>
            <MenuItem value="admin">ADMIN</MenuItem>
            <MenuItem value="user">USER</MenuItem>
          </Select>
        </StyledSelect>
        <StyledInput
          label="Username"
          name="username"
          value={inputs.username}
          onChange={handleInputChange}
          variant="outlined"
          color="warning"
          required
          type="text"
          autoComplete="off"
        />
        <StyledInput
          label="Password"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleInputChange}
          variant="outlined"
          color="warning"
          required
          autoComplete="off"
        />
        <StyledButton
          variant="contained"
          onClick={loginHandler}
        >
          LOGIN
        </StyledButton>
        <Typography variant="body2" sx={{ mt: 1, fontSize: '0.9rem' }}>
          Don't have an account?{" "}
          <Link to="/Signup" style={{ color: 'blue' }}>Sign up</Link>
        </Typography>
      </LoginFormContainer>
      <ImageContainer>
        <img
          style={{
            maxWidth: "100%",
            minHeight: "100vh",
            maxHeight: "90vh",
            objectFit: "cover",
            marginTop:"5px"
          }}
          src="book2.jpg"
          alt="book"
        />
      </ImageContainer>
    </LoginContainer>
  );
};

export default Login;

