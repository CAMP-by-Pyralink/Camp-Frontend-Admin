import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAuthStore } from "../store/useAuthStore";
// import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;
