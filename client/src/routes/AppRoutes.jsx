// client/src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Topbar from "../components/Topbar";
import FloatingCallButton from "../components/FloatingCallButton";
import ComingSoonPage from "../pages/ComingSoonPage";
import HotelBookingPage from "../pages/HotelBookingPage";
import CarBookingPage from "../pages/CarBookingPage";
import Admin from "../admin/Admin";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const TourDetails = lazy(() => import("../pages/TourDetails"));
const CarDetails = lazy(() => import("../pages/CarDetails"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

// Layout wrapper to hide/show navbar & topbar based on route
function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Topbar />}
      {!isAdminRoute && <Navbar />}

      <div className="min-h-screen mt-7">{children}</div>

      {!isAdminRoute && <FloatingCallButton />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
        <Layout>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/browse/tours" element={<BrowseTours />} />
            <Route path="/browse/cars" element={<CarBookingPage />} />

            {/* Tour & Car details */}
            <Route path="/tour/:tourId" element={<TourDetails />} />
            <Route path="/car/:carId" element={<CarDetails />} />
            <Route path="/browse/hotels" element={<HotelBookingPage />} />

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
                  <Admin />
                </ProtectedAdminRoute>
              }
            />
            {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/cars" element={<AdminCars />} />
            <Route path="/admin/tours" element={<AdminTours />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} /> */}
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
