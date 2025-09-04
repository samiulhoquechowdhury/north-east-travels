import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminLogin from "../pages/AdminLogin";
import AdminTours from "../pages/AdminTours";
import AdminCars from "../pages/AdminCars";
import AdminBookings from "../pages/AdminBookings";
import AdminAnalytics from "../pages/AdminAnalytics";
import ForgotPassword from "../pages/ForgotPassword";
import BrowseTours from "../pages/BrowseTours";
import ProtectedAdminRoute from "./ProtectedAdminRoute"; // ✅ add this
import Topbar from "../components/Topbar";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const TourDetails = lazy(() => import("../pages/TourDetails"));
const CarDetails = lazy(() => import("../pages/CarDetails"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />
      <div className="min-h-screen">
        <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse/tours" element={<BrowseTours />} />
            {/* <Route path="/browse/cars" element={<BrowseCars />} /> */}

            {/* Tour & Car details */}
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/cars/:id" element={<CarDetails />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/cars"
              element={
                <ProtectedAdminRoute>
                  <AdminCars />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/tours"
              element={
                <ProtectedAdminRoute>
                  <AdminTours />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedAdminRoute>
                  <AdminBookings />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedAdminRoute>
                  <AdminAnalytics />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
