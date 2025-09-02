const express = require("express");
const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// User routes
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.put("/cancel/:id", protect, cancelBooking);

// Admin routes
router.get("/", protect, admin, getAllBookings);
router.put("/:id", protect, admin, updateBookingStatus);

module.exports = router;
