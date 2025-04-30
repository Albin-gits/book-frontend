import React from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/Login");
  };

  const navButtonStyle = (path) => ({
    margin: "0.25rem",
    color: "white",
    backgroundColor:
      location.pathname === path ? "rgb(255, 153, 51)" : "rgb(129,77,8)",
    "&:hover": {
      backgroundColor: "rgb(255, 153, 51)",
    },
    fontSize: {
      xs: "0.7rem",
      sm: "0.8rem",
      md: "0.9rem",
      lg: "1rem",
    },
    padding: {
      xs: "0.3rem 0.5rem",
      sm: "0.4rem 0.7rem",
      md: "0.5rem 1rem",
    },
    marginRight: isSmallScreen ? "0.5rem" : "1rem", // Adjust right margin
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "rgb(40,20,5)" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "0.5rem 1rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
              marginBottom: { xs: "0.5rem", sm: 0 },
            }}
          >
            BOOK LENS
          </Typography>

          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <Link to="/Home">
              <Button sx={navButtonStyle("/Home")} variant="contained">
                Home
              </Button>
            </Link>
            <Link to="/Books">
              <Button sx={navButtonStyle("/Books")} variant="contained">
                Books
              </Button>
            </Link>
            <Link to="/Reviews">
              <Button sx={navButtonStyle("/Reviews")} variant="contained">
                Reviews
              </Button>
            </Link>

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                sx={navButtonStyle("/logout")}
                variant="contained"
              >
                Logout
              </Button>
            ) : (
              <Link to="/Login">
                <Button sx={navButtonStyle("/Login")} variant="contained">
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
