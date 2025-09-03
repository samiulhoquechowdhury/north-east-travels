import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link
          to="/admin/tours"
          className="bg-blue-200 p-4 rounded-lg shadow text-center"
        >
          Manage Tours
        </Link>
        <Link
          to="/admin/cars"
          className="bg-green-200 p-4 rounded-lg shadow text-center"
        >
          Manage Cars
        </Link>
        <Link
          to="/admin/bookings"
          className="bg-yellow-200 p-4 rounded-lg shadow text-center"
        >
          Manage Bookings
        </Link>
        <Link
          to="/admin/analytics"
          className="bg-purple-200 p-4 rounded-lg shadow text-center"
        >
          Analytics
        </Link>
      </div>
      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
