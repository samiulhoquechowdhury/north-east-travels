import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin → block
    return <Navigate to="/" replace />;
  }

  return children;
}
