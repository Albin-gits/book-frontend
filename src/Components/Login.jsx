import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const hp = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "25px",
    marginLeft: "30",
    paddingLeft: "0px",
  };
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
      const res = await axios.post("https://book-backend-uu0f.onrender.com/view", inputs);
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
    <div>
      <div style={{ display: "lnline-block" }}>
        <img
          style={{
            width: "50%",
            height: "90vh",
            marginTop: "10px",
            float: "right",
          }}
          src="book2.jpg"
          alt="book"
        />
      </div>

      <div style={hp}>
        <p style={{ marginRight: "127px", marginBottom: "0px" }}>
          Start your journey
        </p>
        <h3
          style={{
            marginTop: "15px",
            marginRight: "1px",
            fontSize: "23px",
            fontFamily: "roboto",
          }}
        >
          LOGIN to Book Reviews
        </h3>
        <br />
        <FormControl
          sx={{ marginRight: "40px", width: "225px" }}
          variant="outlined"
          color="warning"
        >
          <InputLabel id="usertype-label">User Type</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype"
            value={usertype} // controlled value
            label="User Type"
            onChange={(e) => setUsertype(e.target.value)} // handle value change
            color="warning"
          >
            <MenuItem value="">Select the User type </MenuItem>
            <MenuItem value="admin">ADMIN</MenuItem>
            <MenuItem value="user">USER</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          sx={{ marginRight: "40px" }}
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
        <br />
        <br />
        <TextField
          sx={{ marginRight: "40px" }}
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
        <br />
        <br />
        <Button
          variant="contained"
          onClick={loginHandler}
          sx={{
            backgroundColor: "rgb(129,77,8)",
            marginRight: "40px",
            width: "220px",
            height: "40px",
          }}
        >
          LOGIN
        </Button>
        <p style={{ marginRight: "45px" }}>
          Don't have an account?{" "}
          <span>
            <Link to="/Signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
