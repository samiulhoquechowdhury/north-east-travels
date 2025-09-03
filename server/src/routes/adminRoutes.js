const express = require("express");
const {
  getStats,
  getTopTours,
  getTopCars,
  getMonthlyBookings,
  getCarTypeDistribution,
} = require("../controllers/adminController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin-only analytics
router.get("/stats", protect, admin, getStats);
router.get("/top-tours", protect, admin, getTopTours);
router.get("/top-cars", protect, admin, getTopCars);
router.get("/monthly-bookings", protect, admin, getMonthlyBookings);
router.get("/car-distribution", protect, admin, getCarTypeDistribution);

module.exports = router;
