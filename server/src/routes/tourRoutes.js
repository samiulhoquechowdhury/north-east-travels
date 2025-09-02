const express = require("express");
const {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getTours);
router.get("/:id", getTourById);

// Admin-only
router.post("/", protect, admin, createTour);
router.put("/:id", protect, admin, updateTour);
router.delete("/:id", protect, admin, deleteTour);

module.exports = router;
