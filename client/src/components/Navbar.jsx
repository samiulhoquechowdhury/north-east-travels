import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Home,
  MapPin,
  Car,
  User,
  LogOut,
  LogIn,
  UserPlus,
  X,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Minimalist Premium Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Simple elegant logo mark */}
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black tracking-tight leading-none">
                  Northeast
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider uppercase leading-none">
                  Travels
                </span>
              </div>
            </Link>

            {/* Clean Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to="/browse/tours"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Tours
              </Link>
              <Link
                to="/browse/cars"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Cars
              </Link>

              {/* Subtle divider */}
              <div className="w-px h-6 bg-gray-200 mx-4"></div>

              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Clean Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl">
            <div className="px-6 py-6 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/browse/tours"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Tours</span>
              </Link>

              <Link
                to="/browse/cars"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <Car className="h-5 w-5" />
                <span className="font-medium">Cars</span>
              </Link>

              {/* Mobile Divider */}
              <div className="h-px bg-gray-200 my-4"></div>

              {user ? (
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">My Bookings</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
}
