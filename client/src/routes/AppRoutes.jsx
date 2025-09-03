import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarDetails from "../pages/CarDetails";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminTours from "../pages/AdminTours";
import AdminCars from "../pages/AdminCars";
import AdminBookings from "../pages/AdminBookings";
import AdminAnalytics from "../pages/AdminAnalytics";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tours" element={<AdminTours />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
