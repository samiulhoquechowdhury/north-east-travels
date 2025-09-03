const express = require("express");
const {
  addReview,
  getTourReviews,
  deleteReview,
  getLatestReviews,
  getTourRating,
} = require("../controllers/reviewController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Add review (user must be logged in)
router.post("/", protect, addReview);

// Static routes first
router.get("/latest", getLatestReviews);
router.get("/rating/:id", getTourRating);

// Dynamic routes with clear prefixes
router.get("/tour/:tourId", getTourReviews);
router.delete("/review/:id", protect, admin, deleteReview);

module.exports = router;
