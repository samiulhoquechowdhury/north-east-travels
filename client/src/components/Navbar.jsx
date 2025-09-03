import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        🌍 Travel Portal
      </Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/profile">My Bookings</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
