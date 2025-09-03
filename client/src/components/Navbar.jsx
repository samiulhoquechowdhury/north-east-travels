import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        🌍 Travel Portal
      </Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/browse/tours">Tours</Link>
        <Link to="/browse/cars">Cars</Link>

        {user ? (
          <>
            <Link to="/profile">My Bookings</Link>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
