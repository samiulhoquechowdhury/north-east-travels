const express = require("express");
const { body } = require("express-validator");
const validate = require("../middlewares/validateMiddleware");
const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("date").notEmpty().withMessage("Date is required"),
    body("pickupLocation")
      .notEmpty()
      .withMessage("Pickup location is required"),
    body("phone").isLength({ min: 10 }).withMessage("Valid phone is required"),
    body("travelers")
      .isInt({ min: 1 })
      .withMessage("At least 1 traveler required"),
  ],
  validate,
  createBooking
);

router.get("/my", protect, getMyBookings);
router.put("/cancel/:id", protect, cancelBooking);
router.get("/", protect, admin, getAllBookings);
router.put("/:id", protect, admin, updateBookingStatus);

module.exports = router;
