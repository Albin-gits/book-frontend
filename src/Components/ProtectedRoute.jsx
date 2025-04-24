import React from 'react'
import { useEffect,useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const location = useLocation();
    const alertedRef = useRef(false);
    useEffect(() => {
      if (!isLoggedIn && !alertedRef.current) {
        alert("Please login to view this page.");
        alertedRef.current = true;
      }
    }, [isLoggedIn,location]);
  
    return isLoggedIn === "true" ? children : <Navigate to="/Login" />;
  };
export default ProtectedRoute