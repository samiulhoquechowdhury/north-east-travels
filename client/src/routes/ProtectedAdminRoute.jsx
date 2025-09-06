// src/routes/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/authAdmin";

export default function ProtectedAdminRoute({ children }) {
  if (!isAdminLoggedIn()) {
    // not logged in -> go to admin login
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
