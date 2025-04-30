import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import AdminNavbar from "./Components/AdminNavbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Books from "./Components/Books";
import Reviews from "./Components/Reviews";
import BookReview from "./Components/BookReview";
import Admin from "./Components/Admin";
import ProtectedRoute from "./Components/ProtectedRoute";
import DisplayReview from "./Components/DisplayReview";
import AdBooks from "./Components/AdBooks";
import AdUser from "./Components/AdUser";
import AdReview from "./Components/AdReview";


import Contact from "./Components/Contact";
function App() {
  const [count, setCount] = useState(0);

  const location = useLocation(); // Get the current route location
  const isAdminRoute = location.pathname.startsWith("/Admin");
  const isAdBooksRoute = location.pathname === "/AdBooks";
  const isAdUserRoute = location.pathname === "/AdUser"; // Check for AdUser route
  const isAdReviewRoute = location.pathname === "/AdReview";
  const navigate = useNavigate();

  return (
    <>
      {!(isAdminRoute || isAdBooksRoute || isAdUserRoute || isAdReviewRoute) && <Navbar />}
      {(isAdminRoute || isAdBooksRoute || isAdUserRoute || isAdReviewRoute) && <AdminNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="BookReview/:isbn13" element={<BookReview />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdBooks" element={<AdBooks />} />
        <Route path="/AdUser" element={<AdUser />} /> {/* Route for AdUser */}
        <Route path="/AdReview" element={<AdReview />} /> 
        <Route path="/DisplayReview/:id" element={<DisplayReview />} />
       
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
