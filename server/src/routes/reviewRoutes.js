const express = require("express");
const {
  addReview,
  getTourReviews,
  deleteReview,
} = require("../controllers/reviewController");
const { protect, admin } = require("../middlewares/authMiddleware");
const { getLatestReviews } = require("../controllers/reviewController");

const router = express.Router();

// Add review (user must be logged in)
router.post("/", protect, addReview);

// Get reviews for a tour
router.get("/:tourId", getTourReviews);

// Delete review (admin only)
router.delete("/:id", protect, admin, deleteReview);

router.get("/latest", getLatestReviews);

module.exports = router;
