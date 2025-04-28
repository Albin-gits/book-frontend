import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/Login"); // Redirect to Login after logout
  };

  return (
    <div>
      <AppBar sx={{ backgroundColor: "rgb(40,20,5)", position: "static" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, color: "white" }}>
            Admin
          </Typography>
          <Link to="/Admin">
            <Button
              sx={{
                marginRight: 2,
                Color: "rgb(250, 250, 250)",
                backgroundColor:
                  location.pathname === "/Admin"
                    ? "rgb(255, 153, 51)"
                    : "rgb(129,77,8)",
                "&:hover": {
                  backgroundColor: "rgb(255, 153, 51)",
                },
              }}
              variant="contained"
            >
              Home
            </Button>
          </Link>

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              sx={{
                marginRight: 2,
                color: "white",
                backgroundColor: "rgb(129,77,8)",
                "&:hover": {
                  backgroundColor: "rgb(255, 153, 51)",
                },
              }}
              variant="contained"
            >
              Logout
            </Button>
          ) : (
            <Link to="/Login">
              <Button
                variant="contained"
                sx={{
                  marginRight: 2,
                  color: "white",
                  backgroundColor:
                    location.pathname === "/Login"
                      ? "rgb(255, 153, 51)"
                      : "rgb(129,77,8)",
                  "&:hover": {
                    backgroundColor: "rgb(255, 153, 51)",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
