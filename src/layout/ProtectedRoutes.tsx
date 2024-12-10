import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoutes;
